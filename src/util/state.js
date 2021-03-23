import _ from "lodash";

function propsActionIsSuccess(currentProps, prevProps, propsName) {
  if (_.isEmpty(propsName) || _.isUndefined(propsName)) {
    return (
      !currentProps.isFetching && prevProps.isFetching && currentProps.success
    );
  }

  const targetedProps = currentProps[propsName];
  const targetedPrevProps = prevProps[propsName];

  return propsActionIsSuccess(targetedProps, targetedPrevProps);
}

export { propsActionIsSuccess };
