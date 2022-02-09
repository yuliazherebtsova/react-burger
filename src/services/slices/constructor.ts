import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IConsructorElement } from 'components/burger-constructor/burger-constructor';
import update from 'immutability-helper';

type TConstructorState = {
  bunElement: IConsructorElement;
  draggableElements: ReadonlyArray<IConsructorElement>;
};

const constructorInitialState: TConstructorState = {
  bunElement: {} as IConsructorElement,
  draggableElements: [],
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState: constructorInitialState,
  reducers: {
    addBunElement(state, action: PayloadAction<IConsructorElement>) {
      state.bunElement = action.payload;
    },
    addNonBunElement(state, action: PayloadAction<IConsructorElement>) {
      state.draggableElements.push(action.payload);
    },
    deleteElement(state, action: PayloadAction<string>) {
      const newElements = state.draggableElements.filter(
        (item) => item.uid !== action.payload
      );
      state.draggableElements = newElements;
    },
    udpadeElementsOrder(
      state,
      action: PayloadAction<{
        draggableElement: IConsructorElement;
        newIndex: number;
      }>
    ) {
      const { newIndex, draggableElement } = action.payload;
      const oldIndex = state.draggableElements.findIndex(
        (item) => item.uid === draggableElement.uid
      );
      const newElements = update(state.draggableElements, {
        $splice: [
          [oldIndex, 1],
          [newIndex, 0, draggableElement],
        ],
      });
      state.draggableElements = newElements;
    },
    resetConstructor() {
      return constructorInitialState;
    },
  },
});

export const {
  addBunElement,
  addNonBunElement,
  deleteElement,
  udpadeElementsOrder,
  resetConstructor,
} = constructorSlice.actions;

export default constructorSlice.reducer;
