import React from 'react'

const TVAnimation = () => {
  return (
    <div style={styles.mainWrapper}>
      <style>{`
        @keyframes static {
          0% { opacity: 0.1; transform: translate(0%, 0%); }
          10% { opacity: 0.15; transform: translate(1%, 1%); }
          20% { opacity: 0.12; transform: translate(-1%, -0.5%); }
          30% { opacity: 0.18; transform: translate(0.5%, -1%); }
          40% { opacity: 0.14; transform: translate(-0.5%, 0.5%); }
          50% { opacity: 0.2; transform: translate(1%, -0.5%); }
          60% { opacity: 0.13; transform: translate(-1%, 1%); }
          70% { opacity: 0.17; transform: translate(0.5%, 0.5%); }
          80% { opacity: 0.11; transform: translate(-0.5%, -1%); }
          90% { opacity: 0.19; transform: translate(1%, -0.5%); }
          100% { opacity: 0.1; transform: translate(0%, 0%); }
        }

        @keyframes scanlines {
          0% { transform: translateY(0%); }
          100% { transform: translateY(100%); }
        }

        @keyframes flicker {
          0% { opacity: 1; }
          5% { opacity: 0.7; }
          10% { opacity: 1; }
          15% { opacity: 0.8; }
          20% { opacity: 1; }
          100% { opacity: 1; }
        }

        .tv-screen::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.3) 0px,
            rgba(0, 0, 0, 0.3) 2px,
            transparent 2px,
            transparent 4px
          );
          pointer-events: none;
          animation: scanlines 2s linear infinite;
          z-index: 5;
        }

        .tv-screen::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle, transparent 50%, rgba(0, 0, 0, 0.4) 100%);
          pointer-events: none;
          z-index: 5;
        }

        .static-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: repeating-radial-gradient(circle, rgba(255,255,255,0.15) 0px, rgba(255,255,255,0.15) 2px, transparent 2px, transparent 4px);
          pointer-events: none;
          animation: static 0.3s infinite;
          z-index: 6;
          border-radius: 10px;
        }

        .flicker-text {
          animation: flicker 0.15s infinite;
        }
      `}</style>

      <div style={styles.main}>
        {/* الهوائي */}
        <div style={styles.antenna}>
          <div style={styles.antennaShadow}></div>
          <div style={styles.a1}></div>
          <div style={styles.a1d}></div>
          <div style={styles.a2}></div>
          <div style={styles.a2d}></div>
          <div style={styles.aBase}></div>
        </div>

        {/* التلفزيون */}
        <div style={styles.tv}>
          <div style={styles.curve}>
            <svg
              style={styles.curveSvg}
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 189.929 189.929"
              xmlSpace="preserve"
            >
              <path
                d="M70.343,70.343c-30.554,30.553-44.806,72.7-39.102,115.635l-29.738,3.951C-5.442,137.659,11.917,86.34,49.129,49.13
                  C86.34,11.918,137.664-5.445,189.928,1.502l-3.95,29.738C143.041,25.54,100.895,39.789,70.343,70.343z"
              />
            </svg>
          </div>

          <div style={styles.displayDiv}>
            <div style={styles.screenOut}>
              <div style={styles.screenOut1}>
                <div style={{...styles.screenM, position: 'relative'}} className="tv-screen">
                  <div className="static-overlay"></div>
                  <span style={styles.notfoundText} className="flicker-text">LANADA</span>
                </div>
              </div>
            </div>
          </div>

          <div style={styles.lines}>
            <div style={styles.line1}></div>
            <div style={styles.line2}></div>
            <div style={styles.line3}></div>
          </div>

          <div style={styles.buttonsDiv}>
            <div style={styles.b1}><div></div></div>
            <div style={styles.b2}></div>
            <div style={styles.speakers}>
              <div style={styles.g1}>
                <div style={styles.g11}></div>
                <div style={styles.g12}></div>
                <div style={styles.g13}></div>
              </div>
              <div style={styles.g}></div>
              <div style={styles.g}></div>
            </div>
          </div>
        </div>

        {/* القاعدة */}
        <div style={styles.bottom}>
          <div style={styles.base1}></div>
          <div style={styles.base2}></div>
          <div style={styles.base3}></div>
        </div>
      </div>
    </div>
  )
}

// جميع الأنماط المعدلة
const styles = {
  mainWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '30em',
    height: 'auto',
    margin: '0 auto',
    transform: 'scale(0.8)',
    position: 'relative'
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '0'  // تم التعديل: من 5em إلى 0
  },
  antenna: {
    width: '5em',
    height: '5em',
    borderRadius: '50%',
    border: '2px solid black',
    backgroundColor: '#f27405',
    marginBottom: '-4em',  // تم التعديل: من -6em إلى -4em
    marginLeft: '0em',
    zIndex: -1,
    position: 'relative'
  },
  antennaShadow: {
    position: 'absolute',
    backgroundColor: 'transparent',
    width: '50px',
    height: '56px',
    marginLeft: '1.68em',
    borderRadius: '45%',
    transform: 'rotate(140deg)',
    border: '4px solid transparent',
    boxShadow: 'inset 0px 16px #a85103, inset 0px 16px 1px 1px #a85103'
  },
  a1: {
    position: 'relative',
    top: '-102%',
    left: '-130%',
    width: '12em',
    height: '5.5em',
    borderRadius: '50px',
    backgroundImage: 'linear-gradient(#171717, #171717, #353535, #353535, #171717)',
    transform: 'rotate(-29deg)',
    clipPath: 'polygon(50% 0%, 49% 100%, 52% 100%)'
  },
  a1d: {
    position: 'relative',
    top: '-211%',
    left: '-35%',
    transform: 'rotate(45deg)',
    width: '0.5em',
    height: '0.5em',
    borderRadius: '50%',
    border: '2px solid black',
    backgroundColor: '#979797',
    zIndex: 99
  },
  a2: {
    position: 'relative',
    top: '-210%',
    left: '-10%',
    width: '12em',
    height: '4em',
    borderRadius: '50px',
    backgroundColor: '#171717',
    backgroundImage: 'linear-gradient(#171717, #171717, #353535, #353535, #171717)',
    marginRight: '5em',
    clipPath: 'polygon(47% 0, 47% 0, 34% 34%, 54% 25%, 32% 100%, 29% 96%, 49% 32%, 30% 38%)',
    transform: 'rotate(-8deg)'
  },
  a2d: {
    position: 'relative',
    top: '-294%',
    left: '94%',
    width: '0.5em',
    height: '0.5em',
    borderRadius: '50%',
    border: '2px solid black',
    backgroundColor: '#979797',
    zIndex: 99
  },
  aBase: {},
  tv: {
    width: '17em',
    height: '9em',
    marginTop: '0',  // تم التعديل: من 3em إلى 0
    borderRadius: '15px',
    backgroundColor: '#d36604',
    display: 'flex',
    justifyContent: 'center',
    border: '2px solid #1d0e01',
    boxShadow: 'inset 0.2em 0.2em #e69635',
    position: 'relative'
  },
  curve: {
    position: 'absolute'
  },
  curveSvg: {
    position: 'absolute',
    marginTop: '0.25em',
    marginLeft: '-0.25em',
    height: '12px',
    width: '12px'
  },
  displayDiv: {
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: '15px',
    boxShadow: '3.5px 3.5px 0px #e69635'
  },
  screenOut: {
    width: 'auto',
    height: 'auto',
    borderRadius: '10px'
  },
  screenOut1: {
    width: '11em',
    height: '7.75em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '10px'
  },
  screenM: {
    width: '13em',
    height: '7.85em',
    position: 'relative',
    fontFamily: 'Montserrat, sans-serif',
    background: 'linear-gradient(to right, #002fc6 0%, #002bb2 14.2857142857%, #3a3a3a 14.2857142857%, #303030 28.5714285714%, #ff0afe 28.5714285714%, #f500f4 42.8571428571%, #6c6c6c 42.8571428571%, #626262 57.1428571429%, #0affd9 57.1428571429%, #00f5ce 71.4285714286%, #3a3a3a 71.4285714286%, #303030 85.7142857143%, white 85.7142857143%, #fafafa 100%)',
    borderRadius: '10px',
    border: '2px solid black',
    zIndex: 99,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    color: '#252525',
    letterSpacing: '0.15em',
    textAlign: 'center',
    overflow: 'hidden'
  },
  notfoundText: {
    backgroundColor: 'black',
    paddingLeft: '0.5em',
    paddingRight: '0.5em',
    fontSize: '0.9em',
    color: 'white',
    letterSpacing: '0.1em',
    borderRadius: '5px',
    zIndex: 10,
    position: 'relative',
    fontFamily: 'monospace',
    fontWeight: 'bold'
  },
  lines: {
    display: 'flex',
    columnGap: '0.1em',
    alignSelf: 'flex-end'
  },
  line1: {
    width: '2px',
    height: '0.5em',
    backgroundColor: 'black',
    borderRadius: '25px 25px 0px 0px',
    marginTop: '0.5em'
  },
  line2: {
    flexGrow: 1,
    width: '2px',
    height: '1em',
    backgroundColor: 'black',
    borderRadius: '25px 25px 0px 0px'
  },
  line3: {
    width: '2px',
    height: '0.5em',
    backgroundColor: 'black',
    borderRadius: '25px 25px 0px 0px',
    marginTop: '0.5em'
  },
  buttonsDiv: {
    width: '4.25em',
    alignSelf: 'center',
    height: '8em',
    backgroundColor: '#e69635',
    border: '2px solid #1d0e01',
    padding: '0.6em',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    rowGap: '0.75em',
    boxShadow: '3px 3px 0px #e69635'
  },
  b1: {
    width: '1.65em',
    height: '1.65em',
    borderRadius: '50%',
    backgroundColor: '#7f5934',
    border: '2px solid black',
    boxShadow: 'inset 2px 2px 1px #b49577, -2px 0px #513721, -2px 0px 0px 1px black',
    position: 'relative'
  },
  b2: {
    width: '1.65em',
    height: '1.65em',
    borderRadius: '50%',
    backgroundColor: '#7f5934',
    border: '2px solid black',
    boxShadow: 'inset 2px 2px 1px #b49577, -2px 0px #513721, -2px 0px 0px 1px black',
    position: 'relative'
  },
  speakers: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '0.5em'
  },
  g1: {
    display: 'flex',
    columnGap: '0.25em'
  },
  g11: {
    width: '0.65em',
    height: '0.65em',
    borderRadius: '50%',
    backgroundColor: '#7f5934',
    border: '2px solid black',
    boxShadow: 'inset 1.25px 1.25px 1px #b49577'
  },
  g12: {
    width: '0.65em',
    height: '0.65em',
    borderRadius: '50%',
    backgroundColor: '#7f5934',
    border: '2px solid black',
    boxShadow: 'inset 1.25px 1.25px 1px #b49577'
  },
  g13: {
    width: '0.65em',
    height: '0.65em',
    borderRadius: '50%',
    backgroundColor: '#7f5934',
    border: '2px solid black',
    boxShadow: 'inset 1.25px 1.25px 1px #b49577'
  },
  g: {
    width: 'auto',
    height: '2px',
    backgroundColor: '#171717'
  },
  bottom: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: '8.7em'
  },
  base1: {
    height: '1em',
    width: '2em',
    border: '2px solid #171717',
    backgroundColor: '#4d4d4d',
    marginTop: '-0.15em',
    zIndex: -1
  },
  base2: {
    height: '1em',
    width: '2em',
    border: '2px solid #171717',
    backgroundColor: '#4d4d4d',
    marginTop: '-0.15em',
    zIndex: -1
  },
  base3: {
    position: 'absolute',
    height: '0.15em',
    width: '17.5em',
    backgroundColor: '#171717',
    marginTop: '0.8em'
  }
}

export default TVAnimation