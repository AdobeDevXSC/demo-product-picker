/*
 * <license header>
 */

import { Text } from "@adobe/react-spectrum";
import { register } from "@adobe/uix-guest";
import { extensionId } from "./Constants";
import metadata from '../../../../app-metadata.json';

console.log('loading extension registration');
function ExtensionRegistration() {
  console.log('loading extension');
  const init = async () => {
    const guestConnection = await register({
      id: extensionId,
      metadata,
      methods: {
        canvas: {
          getRenderers() {
            console.log('getting renderers');
            return [
              // YOUR CUSTOM RENDERERS SHOULD BE HERE
              {
                'dataType': 'cf-reference:sku',
                'url': '/#/renderer/cf-reference/sku'
              },
            ];
          },
        },
      },
    });
  };
  init().catch(console.error);

  return <Text>IFrame for integration with Host (AEM)...</Text>
}

export default ExtensionRegistration;
