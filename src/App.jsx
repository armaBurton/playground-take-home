import { useRef, useState, useEffect } from 'react';
import styles from './App.css';

export default function App() {
  const fileRef = useRef();

  const [text, setText] = useState('');
  const [val, setVal] = useState([]);

  const removePunct = () => {
    return text
      .toLowerCase()
      .replace(/[\".,\/#!$%\^&\*;:{}=\-_`~()\r\n|\n|\r]/g, ' ')
      .split(' ')
      .filter((space) => {
        return /\S/.test(space);
      });
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

  const makeArray = (obj) => {
    const arr = [];
    for (let o in obj) {
      arr.push([o, obj[o]]);
    }
    if (arr.length > 1) {
      setVal(arr);
    }
  };

  const stringToArray = () => {
    const str = removePunct();
    console.log(str);
    const obj = createObject(str);
    makeArray(obj);
  };

  const renderVal = () => {
    val.map((v) => console.log(v));
  };

  useEffect(() => {
    stringToArray();
  }, [text]);

  useEffect(() => {
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
          Click to Upload TXT File
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
      <div className={styles.wordCountSection}>
        <div className={styles.wordCountHolder}>
          {val?.map((vars, i) => {
            return (
              <div key={vars + i} className={styles.wordCountList}>
                <p>
                  Word: <span>{`${vars[0]}`}</span>
                </p>
                <p>
                  Count: <span>{`${vars[1]}`}</span>
                </p>
                <br />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
