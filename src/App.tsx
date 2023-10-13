import { useEffect, useState } from 'react';
import { convertString, enigmaSample } from './lib/enigma';
import { Text, Input } from '@chakra-ui/react';

export function App() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    const [result, _] = convertString(text, enigmaSample);
    setResult(result);
  }, [text]);

  return (
    <>
      <Input value={text} onChange={(e) => {
        setText(e.target.value.toUpperCase())
      }} />
      <Text>{result}</Text>
    </>
  );
}

export default App
