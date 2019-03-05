const reducer = (state = { selectedBooks: [], count: 0 }, action) => {
  //스토어가 바뀌는 액션을 정한 컴포넌트.
  //console.warn("Changes are not persisted to disk");
  switch (action.type) {
    case "AddItem": //액션을 정의
      return {
        ...state,
          selectedBooks: [...state.selectedBooks, action.book]
      };
  }
  return state;
};

export default reducer;

