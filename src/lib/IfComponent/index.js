// @flow
import * as React from "react";

/**
 * @param  {Boolean} props.ifStatement
 * @param  {React.Node | React.Element<any>} props.thenRender
 * @param  {React.Node | React.Element<any> | Null} props.otherRender
 * @return {React.Node | React.Element<any> | Null}
 */
const IfComponent = ({ ifStatement, thenRender, otherRender }) => {
  return (
    <React.Fragment>{ifStatement ? thenRender : otherRender}</React.Fragment>
  );
};

IfComponent.defaultProps = {
  otherRender: null
};

export default IfComponent;
