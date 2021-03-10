import React , { useState } from 'react';
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import { Link , useHistory } from 'react-router-dom';
import {useCard} from '../contexts/CardContext';

function BarcodeScanner () {
 
  const [ data, setData ] = useState('No valid barcode');
  const { setNumber } = useCard();
  const history = useHistory();

  return (
    <>
      <BarcodeScannerComponent
        width={500}
        height={500}
        onUpdate={(err, result) => {
          if (result) {
            setData(result.text);
            setNumber(result.text);
            history.push('/add-card');
          }
          else setData('No valid barcode')
        }}
      />
      <p>{data}</p>
      <Link to='/'>Cancel</Link>
    </>
  )
}
 
export default BarcodeScanner;