/* eslint-disable no-unused-vars */
import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'services/types/hooks';
import { useDrop } from 'react-dnd';
import {
  addBunElement,
  addNonBunElement,
  udpadeElementsOrder,
} from 'services/slices/constructor';
import postOrder from 'services/thunks/order';
import DraggableItem from 'components/draggable-item/draggable-item';
import { IIngredientsData } from 'services/types/data';
import { selectIngredients } from 'services/selectors/ingredients';
import {
  getTotalPrice,
  selectBunElement,
  selectDraggableElements,
} from 'services/selectors/constructor';
import { selectOrderRequest } from 'services/selectors/order';
import appStyles from 'components/app/app.module.css';
import { selectUserData } from 'services/selectors/auth';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { uuidv4 } from 'modules/common/utils';
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from 'modules/common/components';
import { TLocation } from 'components/app/app';
import constructorStyles from './burger-constructor.module.css';

interface IBurgerConstructorProps {
  onOpenModalWithIngredient: (
    evt: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
  ) => void;
}

export interface IConsructorElement extends IIngredientsData {
  readonly uid: string;
}

export interface IFindDraggableElement {
  (uid: string): {
    draggableElement: IConsructorElement | undefined;
    draggableElementIndex: number;
  };
}

export interface IMoveDraggableElement {
  (uid: string, newIndex: number): void;
}

const BurgerConstructor: React.VFC<IBurgerConstructorProps> = ({
  onOpenModalWithIngredient,
}) => {
  const ingredients = useSelector(selectIngredients);

  const bunElement = useSelector(selectBunElement);

  const draggableElements = useSelector(selectDraggableElements);

  const orderRequest = useSelector(selectOrderRequest);

  const totalPrice = useSelector(getTotalPrice);

  const { user } = useSelector(selectUserData);

  const history = useHistory();

  const location: TLocation = useLocation();

  const dispatch = useDispatch();

  const handleIngredientDrop = ({ id }: { id: string }): void => {
    const draggedItem = ingredients.find((item) => item._id === id);
    if (draggedItem?.type === 'bun') {
      dispatch(addBunElement({ ...draggedItem, uid: uuidv4() }));
    } else if (draggedItem && bunElement._id) {
      // ?? ???????????????????????? ?????? ???????? ??????????, ?????????? ???????????????? ??????????????
      dispatch(addNonBunElement({ ...draggedItem, uid: uuidv4() }));
    }
  };

  const handleCanIngredientDrop = ({ id }: { id: string }): boolean => {
    const draggedItem = ingredients.find((item) => item._id === id);
    return !(!bunElement._id && draggedItem?.type !== 'bun');
    // ???????? ?? ???????????????????????? ?????? ?????? ??????????, ???????????????? ?????????????? ????????????
  };

  const [{ isHover, isCanDrop, isDragging }, dropTarget] = useDrop(
    {
      accept: 'BurgerIngredient',
      drop(itemId: { id: string }) {
        handleIngredientDrop(itemId);
      },
      canDrop(itemId: { id: string }) {
        return handleCanIngredientDrop(itemId);
      },
      collect: (monitor) => ({
        isHover: monitor.isOver(),
        isCanDrop: monitor.canDrop(),
        isDragging: monitor.canDrop() && !monitor.isOver(),
      }),
    },
    [handleIngredientDrop, handleCanIngredientDrop]
  );

  const findDraggableElement = useCallback<IFindDraggableElement>(
    (uid: string) => {
      const draggableElement = draggableElements.find(
        (item) => item.uid === uid
      );
      return {
        draggableElement,
        draggableElementIndex: draggableElement
          ? draggableElements.findIndex(
              (item) => item.uid === draggableElement.uid
            )
          : -1,
      };
    },
    [draggableElements]
  );

  const moveDraggableElement = useCallback<IMoveDraggableElement>(
    (uid: string, newIndex: number) => {
      const { draggableElement } = findDraggableElement(uid);
      if (draggableElement) {
        dispatch(
          udpadeElementsOrder({
            draggableElement,
            newIndex,
          })
        );
      }
    },
    [findDraggableElement, dispatch]
  );

  const [, sortTarget] = useDrop(() => ({
    accept: 'DraggableItem',
  }));

  const isConstructorEmpty = !bunElement._id && !draggableElements.length;

  const constructorElementsClass = `${constructorStyles.constructor__elements} 
  ${
    (isConstructorEmpty || isDragging) &&
    constructorStyles.constructor__elements_dropArea
  } 
  ${isHover && isCanDrop ? constructorStyles.constructor__elements_canDrop : ''}
  ${
    isHover && !isCanDrop
      ? constructorStyles.constructor__elements_canNotDrop
      : ''
  }`;

  const onClickToOrderButton: () => void = () => {
    if (user) {
      dispatch(postOrder([bunElement, ...draggableElements]));
    } else {
      history.replace({
        pathname: '/login',
      });
    }
  };

  return (
    <section className="pt-25 pb-2 pl-4">
      <ul className={constructorElementsClass} ref={dropTarget}>
        {bunElement.type === 'bun' && (
          <Link
            to={{
              pathname: `/ingredients/${bunElement._id}`,
              state: { background: location },
            }}
          >
            <li
              className={`${constructorStyles.constructor__bunElement} mr-4 mb-4`}
              onClick={onOpenModalWithIngredient}
              onKeyPress={onOpenModalWithIngredient}
              data-id={bunElement._id}
            >
              <ConstructorElement
                type="top"
                text={`${bunElement.name} (????????)`}
                price={bunElement.price}
                thumbnail={bunElement.image}
                isLocked
              />
            </li>
          </Link>
        )}
        <ul
          className={`${constructorStyles.constructor__nonBunElements} ${appStyles.scroll}`}
          ref={sortTarget}
        >
          {isConstructorEmpty && (
            <p
              className={`${constructorStyles.constructor__text} mt-10
              text text text_type_main-medium text_color_inactive`}
            >
              ???????????????????? ?????????????? ?? ??????????????????????. ?????????????? ???????????????? ??????????????
            </p>
          )}
          {draggableElements.map((item) => (
            <Link
              to={{
                pathname: `/ingredients/${item._id}`,
                state: { background: location },
              }}
              key={item._id}
            >
              <DraggableItem
                key={item.uid}
                id={item._id}
                uid={item.uid}
                name={item.name}
                price={item.price}
                image={item.image}
                onClickToIngredient={onOpenModalWithIngredient}
                findDraggableElement={findDraggableElement}
                moveDraggableElement={moveDraggableElement}
              />
            </Link>
          ))}
        </ul>
        {bunElement.type === 'bun' && (
          <Link
            to={{
              pathname: `/ingredients/${bunElement._id}`,
              state: { background: location },
            }}
          >
            <li
              className={`${constructorStyles.constructor__bunElement} mt-4 mr-4`}
              onClick={onOpenModalWithIngredient}
              onKeyPress={onOpenModalWithIngredient}
              data-id={bunElement._id}
            >
              <ConstructorElement
                type="bottom"
                text={`${bunElement.name} (??????)`}
                price={bunElement.price}
                thumbnail={bunElement.image}
                isLocked
              />
            </li>
          </Link>
        )}
      </ul>
      <div
        className={`${constructorStyles.constructor__totalPriceContainer} mt-10 mr-4`}
      >
        <div className={`${constructorStyles.constructor__totalPrice} mr-10`}>
          <span className="text text_type_digits-medium mr-2">
            {totalPrice}
          </span>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          type="primary"
          size="medium"
          onClick={onClickToOrderButton}
          disabled={totalPrice === 0}
          name="orderSubmitButton"
          htmlType="submit"
        >
          {orderRequest ? '?????????????? ??????????...' : '???????????????? ??????????'}
        </Button>
      </div>
    </section>
  );
};

export default React.memo(BurgerConstructor);
