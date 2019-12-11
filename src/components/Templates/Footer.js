import React from "react";
import { Button, Spinner } from "reactstrap";
import IfComponent from "../../libs/IfComponent";

function Footer({ isFetching, clickHandle, dataCount }) {
  return (
    <div className="footer">
      <IfComponent
        ifStatement={!isFetching}
        thenRender={
          <Button
            color="success"
            onClick={() => {
              clickHandle(dataCount + 10);
            }}
          >
            Load More
          </Button>
        }
        otherRender={<Spinner color="success" />}
      />
    </div>
  );
}

export default Footer;
