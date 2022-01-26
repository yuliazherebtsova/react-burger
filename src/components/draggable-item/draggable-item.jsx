import { useDispatch } from 'react-redux';
import { useDrag, DragPreviewImage, useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { DELETE_ELEMENT } from 'services/actions/constructor';
import draggableItemStyles from './draggable-item.module.css';

function DraggableItem({
  id,
  uid,
  name,
  price,
  image,
  onClickToIngredient,
  findDraggableElement,
  moveDraggableElement,
}) {
  const dispatch = useDispatch();

  const originalIndex = findDraggableElement(uid).draggableElementIndex;

  const [{ isDragging }, dragRef, dragPreview] = useDrag(
    () => ({
      type: 'DraggableItem',
      item: { uid, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (_, monitor) => {
        if (!monitor.didDrop()) {
          moveDraggableElement(uid, originalIndex);
        }
      },
    }),
    [uid, moveDraggableElement, originalIndex]
  );

  const [, dropTarget] = useDrop(
    () => ({
      accept: 'DraggableItem',
      hover({ uid: draggedUid }) {
        if (draggedUid !== uid) {
          const { draggableElementIndex: overIndex } =
            findDraggableElement(uid);
          moveDraggableElement(draggedUid, overIndex);
        }
      },
    }),
    [findDraggableElement, moveDraggableElement]
  );

  const handleIngredientDelete = (e) => {
    const itemToDeleteUid = e.target.closest('li').dataset.uid;
    dispatch({
      type: DELETE_ELEMENT,
      uid: itemToDeleteUid,
    });
  };

  return (
    <li
      className={`${draggableItemStyles.draggableElement} 
      ${
        isDragging && draggableItemStyles.draggableElement_isDragging
      } mb-4 ml-2`}
      key={uid}
      onClick={onClickToIngredient}
      onKeyPress={onClickToIngredient}
      data-id={id}
      data-uid={uid}
      ref={(node) => dragRef(dropTarget(node))}
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
  findDraggableElement: PropTypes.func.isRequired,
  moveDraggableElement: PropTypes.func.isRequired,
};

export default DraggableItem;
