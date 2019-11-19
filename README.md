# react-native-easy-action-sheet

[![npm](https://img.shields.io/npm/v/react-native-easy-action-sheet.svg)](https://www.npmjs.com/package/react-native-easy-action-sheet)
[![npm](https://img.shields.io/npm/dm/react-native-easy-action-sheet.svg)](https://www.npmjs.com/package/react-native-easy-action-sheet)
[![npm](https://img.shields.io/npm/dt/react-native-easy-action-sheet.svg)](https://www.npmjs.com/package/react-native-easy-action-sheet)
[![npm](https://img.shields.io/npm/l/react-native-easy-action-sheet.svg)](https://github.com/DaiYz/react-native-easy-action-sheet/blob/master/LICENSE)

## ScreenShots
<p>
<img alt="react-native-easy-action-sheet" src="./screenshots/1.png" width="207" height="448" />
<img alt="react-native-easy-action-sheet" src="./screenshots/2.png" width="207" height="448" />
</p>

## Installation

* [npm](https://www.npmjs.com/#getting-started): `npm install react-native-easy-action-sheet --save`
* [Yarn](https://yarnpkg.com/): `yarn add react-native-easy-action-sheet`

## Example
```jsx 
import { Header } from 'react-navigation'
import { Header } from 'react-navigation-stack' (4.x)
import ActionSheet from 'react-native-easy-action-sheet'
class Demo extends React.Component {
  showActionSheet = () => {
    this.ActionSheet.show()
  }
  render() {
    return (
      <View>
        <Text onPress={this.showActionSheet}>Open ActionSheet</Text>
        <ActionSheet
          androidHeaderHeight={Header.HEIGHT}
          ref={e => this.ActionSheet = e}
          title={'Which one do you like ?'}
          options={['Apple', 'Banana', 'cancel']}
          cancelButtonIndex={2}
          destructiveButtonIndex={1}
          onPress={(index) => { /* do something */ }}
        />
      </View>
    )
  }
}

```



