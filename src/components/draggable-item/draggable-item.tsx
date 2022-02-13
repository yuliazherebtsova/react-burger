import React, { useCallback } from 'react';
import { useDispatch } from 'services/types/hooks';
import { useDrag, DragPreviewImage, useDrop } from 'react-dnd';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { deleteElement } from 'services/slices/constructor';
import {
  IFindDraggableElement,
  IMoveDraggableElement,
} from 'components/burger-constructor/burger-constructor';
import draggableItemStyles from './draggable-item.module.css';

interface IDraggableItemProps {
  id: string;
  uid: string;
  image: string;
  name: string;
  price: number;
  onClickToIngredient: (
    // eslint-disable-next-line no-unused-vars
    evt: React.MouseEvent<Element> | React.KeyboardEvent<Element>
  ) => void;
  findDraggableElement: IFindDraggableElement;
  moveDraggableElement: IMoveDraggableElement;
}

const DraggableItem: React.VFC<IDraggableItemProps> = ({
  id,
  uid,
  name,
  price,
  image,
  onClickToIngredient,
  findDraggableElement,
  moveDraggableElement,
}) => {
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
      hover({ uid: draggedUid }: { uid: string }) {
        if (draggedUid !== uid) {
          const { draggableElementIndex: overIndex } =
            findDraggableElement(uid);
          moveDraggableElement(draggedUid, overIndex);
        }
      },
    }),
    [findDraggableElement, moveDraggableElement]
  );

  const handleIngredientDelete = useCallback(() => {
    dispatch(deleteElement(uid));
  }, [uid, dispatch]);

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
};

export default React.memo(DraggableItem);
