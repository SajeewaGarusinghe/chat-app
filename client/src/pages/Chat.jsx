import React from 'react';
import styled from 'styled-components';

const Chat = () => {
  return (
    <Container>
      <div className="container"></div>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-column: 35% 65%;
    }
    @media screen and (min-width: 360px) and (max-width: 480px) {
      grid-template-column: 35% 65%;
    }
  }
`;
export default Chat;
