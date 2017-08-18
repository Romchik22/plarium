import React from 'react'
import ColorPicker from './ColorPicker';

const colors =  [{name: 'red', value: '#ff0000'}, {name: 'blue', value: '#0066ff'}, {name: 'yellow', value: '#fff58a'}];
const value  =  '#fff58a';
const onChange = (color) =>  console.log('color: ', color, ' has been selected') ;

const App = () => (
    <div>
      <ColorPicker colors={colors} value={value} onChange={onChange}/>
    </div>
);

export default App