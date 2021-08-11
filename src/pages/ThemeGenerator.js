import React from 'react';
import Layout from '@theme/Layout';
import { SketchPicker } from 'react-color'
import { TextField } from '@material-ui/core'

function Hello() {
  return (
    <Layout title="Hello">
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
          fontSize: '20px',
        }}>
        <TextField label="主题色" />
      </div>
    </Layout>
  );
}

export default Hello;