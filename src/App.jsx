import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import  Button  from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";
import Row from "./ui/Row";


const StyledApp = styled.div`
  /* background-color: orangered; */
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row>
        <Row type="horizontal">
        <Heading as="h1">The Wild Oasis</Heading>
        <div>
        <Heading as="h2">Check in and Out</Heading>
        <Button 
        onClick={() => alert("check in")}>Check In</Button>

        <Button 
          variations="secondary"
          size="medium"
        onClick={() => alert("check out")}>Check Out</Button>
        </div>
        </Row>

        <Row >
        <form>
        <Heading as="h3">Form</Heading>
        <Input type="number" placeholder="Number type"></Input>
        <Input type="number" placeholder="Number type"></Input>
        </form>
        </Row>
        </Row>
      </StyledApp>
    </>
  );
}

export default App;
