import styled from 'styled-components';
import colorScheme from './colorScheme';

const Button = styled.button`
  font-family: sans-serif;
	font-size: 18px;
	margin: 5px;
	margin-top: 0;
	background-color:  ${colorScheme.primary};
	color: ${colorScheme.light};
	border: none;
	border-radius: 5px;
	padding: 0.5em 1em 0.5em 1em;
`;

export default Button;
