import React, { useState, useEffect } from "react";
import { Provider, Button, Content } from "@adobe/react-spectrum";
import { attach } from "@adobe/uix-guest";
import { lightTheme } from "@adobe/react-spectrum";
import { extensionId } from "./Constants";
import metadata from '../../../../app-metadata.json';
import { register } from "@adobe/uix-guest";

export default FilterModels = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [connection, setConnection] = useState();
  useEffect(() => {
    const init = async () => {
      // connect to the host 
      const connection = await attach({ id: extensionId });
    };
    init().catch((e) =>
      console.log("Extension got the error during initialization:", e)
    );
  }, []);

  const onCloseHandler = () => {
    guestConnection.host.modal.close();
  };

  return (
    <Provider theme={lightTheme} colorScheme="light">
      <Content width="100%">
        <Button variant="primary" onPress={onCloseHandler} position="fixed" bottom="0px" right="8px">
          Close
        </Button>
      </Content>
    </Provider>
  );


}