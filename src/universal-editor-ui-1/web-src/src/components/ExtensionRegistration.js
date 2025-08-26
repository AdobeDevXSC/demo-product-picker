/*
 * <license header>
 */

import { Text } from "@adobe/react-spectrum";
import { register } from "@adobe/uix-guest";
import { extensionId } from "./Constants";

console.log('loading extension registration 2');
function ExtensionRegistration() {
  const init = async () => {
    const guestConnection = await register({
      id: extensionId,
      metadata: {one: 'test'},
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
