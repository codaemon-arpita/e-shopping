import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';


const MessageContainer = styled.div`
  color: ${ /* istanbul ignore next */ props => props.error ? props.theme.errorRed : props.theme.accentGreen };
  li {
    float: none;
    font-size: 16px;
    margin-left: 0px;
  }
`

// const splitMessage = (body) => body.split("<br/> <br/>").map((line)=> (<span>{line}<br/></span>));
const removeBreaks = (body) => body.replace("<br/> <br/>", "");

const Messages = props => {
  const { messages, error } = props;
  return (
    <MessageContainer error={error} className={props.className}>
      <ul>
        {messages.map(message => <li key={message.time}>{message.body ? removeBreaks(message.body) : " "}</li>)}
      </ul>
    </MessageContainer>
  )
}

Messages.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      body: PropTypes.string,
      time: PropTypes.date,
    })
  ),
  error: PropTypes.bool,
}

export default Messages;
