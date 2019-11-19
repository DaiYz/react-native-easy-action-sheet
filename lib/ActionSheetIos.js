import React from 'react'
import { ActionSheetIOS } from 'react-native'
export default class ActionSheetIos extends React.PureComponent {
  show () {
    const props = this.props
    const callback = props.onPress
    ActionSheetIOS.showActionSheetWithOptions(props, callback)
  }

  render () {
    return null
  }
}
