import { useRef, useState, useEffect } from 'react';
import styles from './App.css';

export default function App() {
  const fileRef = useRef();

  const [text, setText] = useState('');
  const [val, setVal] = useState([]);

  const removePunct = (str) => {
    return text
      .replace(/[\".,\/#!$%\^&\*;:{}=\-_`~()\r\n|\n|\r]/g, '')
      .split(' ');
  };

  const createObject = (str) => {
    let obj = {};
    str.map((s) => {
      if (obj.hasOwnProperty(s)) {
        obj[s] = obj[s] + 1;
      } else {
        obj = { ...obj, [`${s}`]: 1 };
      }
    });

    return obj;
  };

  const stringToArray = () => {
    const str = removePunct();
    const obj = createObject(str);
    const arr = [];
    for (let o in obj) {
      arr.push([o, obj[o]]);
    }
    console.log(obj);
    setVal(arr);
  };

  const renderVal = () => {
    val.map((v) => console.log(v));
  };

  useEffect(() => {
    stringToArray();
  }, [text]);

  useEffect(() => {
    console.log(val.length);
    renderVal();
  }, [val]);

  const handleChange = (e) => {
    const [file] = e.target.files;
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (e) => {
      setText(e.target.result);
    };
  };

  return (
    <section>
      <div className={styles.uploadSection}>
        <button
          className={styles.upload}
          onClick={() => fileRef.current.click()}
        >
          Custom File Input Button
        </button>
        <input
          ref={fileRef}
          onChange={handleChange}
          multiple={false}
          accept=".txt"
          type="file"
          hidden
        />
      </div>
      <div className={styles.readTextSection}>{`${text}`}</div>
    </section>
  );
}
