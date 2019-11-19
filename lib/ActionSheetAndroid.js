import React from 'react'
import { Text, View, Dimensions, Modal, TouchableHighlight, Animated, StyleSheet, Easing, TouchableOpacity, StatusBar, ScrollView, PixelRatio } from 'react-native'
const { width, height } = Dimensions.get('window')
const DELCOLOR = '#FF3B30'
const MINLINE = 1 / PixelRatio.get()
export default class ActionSheetAndroid extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      show: false
    }
    this.containerHeight = this.getHeight()
    this.header = props.androidHeaderHeight
    this.visibleContainer = height - this.header
    this.useScroll = this.visibleContainer < this.containerHeight
    this.actualHeight = this.useScroll ? height - this.header - StatusBar.currentHeight : this.containerHeight
    this.animatedHeight = new Animated.Value(0)
  }

  getHeight = () => {
    const { options } = this.props
    const bottomPadding = 24
    const itemHeight = 48 * options.length
    const lineHeight = MINLINE * options.length - 1
    const margin = 10
    return bottomPadding + itemHeight + lineHeight + margin + this.getAllTextHeight() + 10
  }

  getAllTextHeight = () => {
    const { title, message } = this.props
    if (!title && !message) {
      return 0
    }
    let titleHeight = 0
    let messageHeight = 0
    if (title) {
      titleHeight = this.getTextHeight(title)
    }
    if (message) {
      messageHeight = this.getTextHeight(message)
    }
    return titleHeight + messageHeight + 20 + 24
  }

  getTextHeight = (text) => {
    if (text) {
      const titleWidth = text.length * 12
      const titleContaierWidth = width - 16 - 44
      const line = Math.ceil(titleWidth / titleContaierWidth)
      const titleHeight = line * ((12 + 0.00000007) / 0.7535)
      return titleHeight
    }
  }

  getBtnsIndex = (index) => {
    const { cancelButtonIndex } = this.props
    if (index < cancelButtonIndex) {
      return index
    } else {
      return index + 1
    }
  }

  show = () => {
    this.setState({
      show: true
    }, () => setTimeout(() => this._showSheet(), 0))
  }

  handleHide = () => {
    this._hideSheet(() => this.setState({
      show: false
    }))
  }

  _showSheet = () => {
    Animated.timing(this.animatedHeight, {
      toValue: 1,
      duration: 280,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true
    }).start()
  }

  _hideSheet = (cb) => {
    Animated.timing(this.animatedHeight, {
      toValue: 0,
      duration: 200,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true
    }).start(() => { cb && cb() })
  }

  _renderBottomButton = () => {
    const { cancelButtonIndex = 0, options, tintColor, onPress } = this.props
    const title = options[cancelButtonIndex]
    return (
      <TouchableHighlight
        style={[styles.btn, styles.cancelBtn]}
        activeOpacity={0.7}
        underlayColor='#F4F4F4'
        onPress={() => {
          onPress(cancelButtonIndex)
          this.handleHide()
        }}
      >
        <Text style={[styles.text, tintColor && { color: tintColor }]}>{title}</Text>
      </TouchableHighlight>
    )
  }

  _renderContent = () => {
    const { cancelButtonIndex = 0, options, destructiveButtonIndex, tintColor, onPress } = this.props
    const btns = options.filter((item, index) => index !== cancelButtonIndex)
    return btns.map((item, index) =>
      <TouchableHighlight
        key={index}
        activeOpacity={0.9}
        underlayColor='#F4F4F4'
        style={[styles.btns]}
        onPress={() => {
          onPress(this.getBtnsIndex(index))
          this.handleHide()
        }}
      >
        <Text style={[styles.text, { fontWeight: 'normal' }, tintColor && { color: tintColor }, destructiveButtonIndex && this.getBtnsIndex(index) === destructiveButtonIndex && { color: DELCOLOR }]}>{item}</Text>
      </TouchableHighlight>
    )
  }

  _renderTitle = () => {
    const { title, message } = this.props
    if (!title && !message) return null
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          {
            title && <Text style={[styles.title, message && { fontWeight: 'bold' }]}>{title}</Text>
          }
          {
            message && <Text style={[styles.message]}>{message}</Text>
          }
        </View>
        <View style={{ height: MINLINE, width: '100%', backgroundColor: 'rgba(0,0,0,0.4)' }} />
      </View>
    )
  }

  _renderView = () => {
    const { title, message } = this.props
    if (this.useScroll) {
      return (
        <View style={{ height: '100%' }}>
          <View style={{ flex: 1, borderRadius: 10, overflow: 'hidden', marginHorizontal: 8 }}>
            <ScrollView
              stickyHeaderIndices={title || message ? [0] : [-1]}
            >
              {this._renderTitle()}
              {this._renderContent()}
            </ScrollView>
          </View>
          {
            this._renderBottomButton()
          }
        </View>
      )
    } else {
      return (
        <View>
          <View style={[styles.buttonContainer]}>
            {this._renderTitle()}
            {this._renderContent()}
          </View>
          {
            this._renderBottomButton()
          }
        </View>
      )
    }
  }

  render () {
    const { show } = this.state
    return (
      <Modal
        visible={show}
        transparent
        onRequestClose={this.handleHide}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={this.handleHide}
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.4)',
            paddingTop: this.header,
            justifyContent: 'flex-end'
          }}
        >
          <Animated.View
            style={[{ paddingBottom: 24 },
              {
                transform: [{
                  translateY:
                    this.animatedHeight.interpolate({
                      inputRange: [0, 1],
                      outputRange: [this.actualHeight, 0]
                    })
                }]
              }
            ]}
          >
            {
              this._renderView()
            }
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  titleContainer: {
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingVertical: 12
  },
  title: {
    color: '#aaa',
    fontSize: 12,
    textAlign: 'center'
  },
  message: {
    color: '#aaa',
    fontSize: 11,
    marginVertical: 10,
    textAlign: 'center'
  },
  buttonContainer: {
    borderRadius: 10,
    marginHorizontal: 8,
    overflow: 'hidden'
  },
  topRadius: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  bottomRadius: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  btn: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    height: 48,
    alignItems: 'center',
    marginHorizontal: 8
  },
  btns: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    height: 48,
    marginBottom: MINLINE,
    alignItems: 'center'
  },
  cancelBtn: {
    marginTop: 10,
    borderRadius: 10
  },
  text: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold'
  }
})
