import React, { Component } from 'react'
import styled, { injectGlobal } from 'styled-components'
import axios from 'axios'
import poster from './poster.jpg'

injectGlobal`
  * {
    box-sizing: border-box;
  }
`

class App extends Component {
  state = {
    comments: [],
    text: '',
    isFetching: false
  }

  componentDidMount = async () => {
    const {
      data: { comments }
    } = await axios.get('http://localhost:3000/comments')
    this.setState({ comments })
  }

  handleClick = async () => {
    const { text } = this.state
    this.setState({
      isFetching: true
    })
    const res = await axios.post('http://localhost:3000/comment', { text })
    this.setState({
      isFetching: false
    })
    const { comment } = res.data
    this.setState({
      text: '',
      comments: [...this.state.comments, comment]
    })
  }

  handleChange = e => {
    this.setState({
      text: e.target.value
    })
  }

  render() {
    const { comments, isFetching } = this.state
    const btnText = isFetching ? '提交中...' : '提交'
    const cmtList = comments.map(t => <Comment key={t._id}>{t.text}</Comment>)
    return (
      <Wrap>
        <Img src={poster} />
        <CommentList>{cmtList}</CommentList>
        <Input value={this.state.text} onChange={this.handleChange} />
        <ErrMsg>提交错误</ErrMsg>
        <Button disabled={isFetching} onClick={this.handleClick}>
          {btnText}
        </Button>
      </Wrap>
    )
  }
}

export default App

const Wrap = styled.div`
  width: 400px;
  margin: 30px auto;
`

const Img = styled.img`
  display: block;
  padding: 20px;
  width: 100%;
  border: 2px solid #00bcd4;
`

const CommentList = styled.div`
  margin: 20px auto;
`

const Comment = styled.div`
  margin: 10px 0;
  line-height: 1.9;
`

const Input = styled.textarea`
  outline: 0;
  border: 2px solid lavender;
  width: 100%;
  padding: 10px 5px;
  &:focus {
    outline: 0;
    border: 2px solid #00bcd4;
  }
`

const Button = styled.button`
  border: 2px solid #00bcd4;
  border-radius: 0;
  width: 30%;
  float: right;
  margin: 9px 0;
  padding: 8px;
  &:focus {
    outline: none;
  }
  &:hover {
    cursor: pointer;
  }
  &:disabled {
    border: 2px solid lavender;
    cursor: text;
  }
`

const ErrMsg = styled.div`
  width: 40%;
  color: palevioletred;
  margin-top: 9px;
  float: left;
`
