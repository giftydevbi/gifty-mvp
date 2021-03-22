import React, { useState } from 'react';
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import { Link, useHistory } from 'react-router-dom';
import { useCard } from '../contexts/CardContext';
import { Card } from 'react-bootstrap';

function BarcodeScanner() {

  const [data, setData] = useState('Looking for valid barcode');
  const { setNumber ,setScanSuccess } = useCard();
  const history = useHistory();

  return (
    <>

      <BarcodeScannerComponent
        onUpdate={(err, result) => {
          if (result) {
            setData(result.text);
            setNumber(result.text);
            setScanSuccess(true);
            history.push('/add-card');
          }
          else setData('Looking for valid barcode')
        }}
      />
      <Card>
        <Card.Body>
          <p>{data}</p>
          <Link to='/add-card'>Cancel</Link>
        </Card.Body>
      </Card>
    </>
  )
}

export default BarcodeScanner;