import React, { useState, useEffect } from "react";
import { Provider, Button, Content } from "@adobe/react-spectrum";
import {Cell, Column, Row, TableView, TableBody, TableHeader} from '@adobe/react-spectrum'

import { attach } from "@adobe/uix-guest";
import { lightTheme } from "@adobe/react-spectrum";
import { extensionId } from "./Constants";
import metadata from '../../../../app-metadata.json';
import { register } from "@adobe/uix-guest";

export default FilterModels = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [connection, setConnection] = useState();
  let columns = [
    { name: 'Title', uid: 'title' },
    { name: 'Name', uid: 'name' },
    { name: 'Model', uid: 'model' },
    { name: 'Folder', uid: 'folder' },
    { name: 'Status', uid: 'status' },
    { name: 'Modified At', uid: 'modifiedAt' }
  ];

  let rows = [
    { id: 1, title: 'The Magic of Expresso', name: 'the-mage', model: 'Articl', folder: 'articles', status: 'published',  modiedAt: 'today'},
  ];
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
        <TableView
          aria-label="Example table with dynamic content">
          <TableHeader columns={columns}>
            {column => (
              <Column
                key={column.uid}
                align={column.uid === 'date' ? 'end' : 'start'}>
                {column.name}
              </Column>
            )}
          </TableHeader>
          <TableBody items={rows} width="100%">
            {item => (
              <Row>
                {columnKey => <Cell>{item[columnKey]}</Cell>}
              </Row>
            )}
          </TableBody>
        </TableView>
        <Button variant="primary" onPress={onCloseHandler} position="fixed" bottom="0px" right="8px">
          Close
        </Button>
      </Content>
    </Provider>
  );


}