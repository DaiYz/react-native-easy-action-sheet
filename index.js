import ActionSheetIos from './lib/ActionSheetIos'
import ActionSheetAndroid from './lib/ActionSheetAndroid'
import { Platform } from 'react-native'
import PropTypes from 'prop-types'
const ActionSheet = Platform.select({
  ios: ActionSheetIos,
  android: ActionSheetAndroid
})

ActionSheet.propTypes = {
  options: PropTypes.array,
  cancelButtonIndex: PropTypes.number,
  destructiveButtonIndex: PropTypes.number,
  title: PropTypes.string,
  message: PropTypes.string,
  androidHeaderHeight:  PropTypes.number.isRequired,
  tintColor: PropTypes.string,
  onPress: PropTypes.func
}

ActionSheet.defaultProps = {
  cancelButtonIndex: 0,
  onPress: (index) => console.log(index)
}

export default ActionSheet
