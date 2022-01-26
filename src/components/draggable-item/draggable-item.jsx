import { useDispatch } from 'react-redux';
import { useDrag, DragPreviewImage } from 'react-dnd';
import PropTypes from 'prop-types';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { DELETE_ELEMENT } from 'services/actions/constructor';
import draggableItemStyles from './draggable-item.module.css';

function DraggableItem({ id, uid, name, price, image, onClickToIngredient }) {
  const dispatch = useDispatch();

  const originalIndex = findCard(id).index;
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: 'DraggableItem',
      item: { id, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          //moveCard(droppedId, originalIndex);
        }
      },
    }),
    [id, originalIndex]
  );

  const [, drop] = useDrop(
    () => ({
      accept: 'DraggableItem',
      hover({ id: draggedId }) {
        if (draggedId !== id) {
          const { index: overIndex } = findCard(id);
          moveCard(draggedId, overIndex);
        }
      },
    }),
    [findCard, moveCard]
  );

  const handleIngredientDelete = (e) => {
    const itemToDeleteUid = e.target.closest('li').dataset.uid;
    dispatch({
      type: DELETE_ELEMENT,
      uid: itemToDeleteUid,
    });
  };

  const opacity = isDragging ? 0 : 1;
  return (
    <li
      className={`${draggableItemStyles.draggableElement} mb-4 ml-2`}
      key={uid}
      onClick={onClickToIngredient}
      onKeyPress={onClickToIngredient}
      data-id={id}
      data-uid={uid}
      ref={(node) => dragRef(drop(node))}
      style={{ ...style, opacity }}
    >
      <DragIcon type="primary" />
      <DragPreviewImage src={image} connect={dragPreview} />
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
        handleClose={handleIngredientDelete}
      />
    </li>
  );
}

DraggableItem.propTypes = {
  id: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  onClickToIngredient: PropTypes.func.isRequired,
};

export default DraggableItem;
