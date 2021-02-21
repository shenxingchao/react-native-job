const ThemeColor = {
  primary: '#5DD5C8',
  white: '#ffffff',
  h1: '#333333',
  h2: '#555555'
}
const theme = {
  Button: {
    raised: false, //相当于css important
    titleStyle: {
      //这个titleStyle的类型是Text style (object)     继承自rn组件的Text的style
      color: '#ffffff',
      fontSize: 50,
      fontWeight: 'normal',
      textTransform: 'lowercase',
      writingDirection: 'ltr',
      textShadowColor: 'red',
      textShadowOffset: { width: 10, height: 10 }
    }
  }
}
export { ThemeColor, theme }
