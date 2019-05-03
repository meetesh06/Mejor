import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
  Image
} from "react-native";
import { WebGLView } from "react-native-webgl";
import THREE from "../helpers/three";
import Swiper from 'react-native-swiper';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

export default class App extends React.Component {
  // requestId: *;
  constructor(props) {
    super(props);
    this.anim1 = new Animated.Value(0);
    this.anim2 = new Animated.Value(150);
    this.anim3 = new Animated.Value(0);
  }

  state = {
    animating: false
  }

  startAnimationOne = () => {
    this.setState({
      animating: true
    })
    Animated.spring(
      this.anim1,
      {
        toValue: 100,
        friction: 5
      }
    ).start(() => {
      Animated.spring(
        this.anim1,
        {
          toValue: 0,
          friction: 5
        }
      ).start(() => {
        this.setState({
          animating: false
        })
      });
    });
  }
  
  startAnimationTwo = () => {
    this.setState({
      animating: true
    })
    Animated.spring(
      this.anim2,
      {
        toValue: 5000,
        friction: 5
      }
    ).start(() => {
      Animated.spring(
        this.anim2,
        {
          toValue: 150,
          friction: 5
        }
      ).start(() => {
        this.setState({
          animating: false
        })
      });
    });
  }

  startAnimationThree = () => {
    this.setState({
      animating: true
    })
    Animated.timing(
      this.anim3,
      {
        toValue: 1000,
        duration: 3000
      }
    ).start(() => {
      Animated.spring(
        this.anim3,
        {
          toValue: 0,
          // duration: 3000,
          friction: 17
        }
      ).start(() => {
        this.setState({
          animating: false
        })
      });
    });
  }
  
  componentWillUnmount() {
    cancelAnimationFrame(this.requestId);
  }
  onContextCreate = (gl: WebGLRenderingContext) => {
    const rngl = gl.getExtension("RN");

    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
    const renderer = new THREE.WebGLRenderer({
      canvas: {
        width,
        height,
        style: {},
        addEventListener: () => {},
        removeEventListener: () => {},
        clientHeight: height
      },
      context: gl
    });
    renderer.setSize(width, height);
    renderer.setClearColor(0x333333, 1);

    let camera, scene;
    let cube;

    function init() {
      camera = new THREE.PerspectiveCamera(75, width / height, 1, 1100);
      camera.position.y = 150;
      camera.position.z = 500;
      scene = new THREE.Scene();

      let geometry = new THREE.BoxGeometry(200, 200, 200);
      for (let i = 0; i < geometry.faces.length; i += 2) {
        let hex = Math.random() * 0xffffff;
        geometry.faces[i].color.setHex(hex);
        geometry.faces[i + 1].color.setHex(hex);
      }

      let material = new THREE.MeshBasicMaterial({
        vertexColors: THREE.FaceColors,
        overdraw: 0.5
      });

      cube = new THREE.Mesh(geometry, material);
      cube.position.y = 150;
      scene.add(cube);
    }
    const animate = () => {
      this.requestId = requestAnimationFrame(animate);
      renderer.render(scene, camera);

      cube.rotation.y += 0.05;

      gl.flush();
      rngl.endFrame();
    };

    init();
    animate();
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Swiper loop={false} loadMinimal loadMinimalSize={1} horizontal={false} style={styles.wrapper} showsButtons={false}>
          <View>
            <WebGLView
              style={styles.webglView}
              onContextCreate={this.onContextCreate}
            />
            <View
              style={{
                margin: 10
              }}
            >
              <Text
                style={{
                  color: '#c0c0c0',
                  fontSize: 25
                }}
              >
                Welcome to Computer Graphics
              </Text>
              <View
                style={{
                  marginTop: 10,
                  marginLeft: 10,
                  marginRight: 20,
                  borderBottomWidth: 2,
                  borderBottomColor: '#c0c0c0',
                  borderRadius: 10,
                }}
              />
              <Text
                style={{
                  margin: 15,
                  color: '#c0c0c0',
                  fontSize: 20
                }}
              >
                Displaying pictures on display is a computation heavy task.
                {'\n'}
                Computer graphics are used to simplify the process and make it possible to render
                complicated content like games, images, videos, etc.
                {/* {'\n'} */}
                This application is meant to be an introductore course to help undergrads understand the concepts 
                better and apply them to real life.
              </Text>
              <Text
                style={{
                  marginTop: 40,
                  textAlign: 'center',
                  color: '#a0a0a0'
                }}
              >
                Swipe down to get started
              </Text>
            </View>
          </View>
          <View>
            <View
              style={{
                margin: 10
              }}
            >
              <Text
                style={{
                  color: '#c0c0c0',
                  fontSize: 25,
                  fontWeight: 'bold'
                }}
              >
                Introduction
              </Text>
              <View>
                <Image style={{ width: '100%', marginTop: 30, height: 200, borderRadius: 10 }} resizeMode="contain" source={require('../../media/page1_media_2.png')} />
                <Text
                  style={{
                    color: '#f0f0f0',
                    marginTop: 40,
                    fontSize: 20,
                    textAlign: 'center',
                    fontWeight: '400'
                  }}
                >
                  1.1 Everything starts with a pixel
                </Text>
                <Text
                  style={{
                    margin: 15,
                    color: '#c0c0c0',
                    fontSize: 20
                  }}
                >
                  A pixel is the smallest unit of a digital image or graphic that can be displayed and represented on a digital display device.
                  {'\n'}
                  {'\n'}
                  A pixel is the basic logical unit in digital graphics. Pixels are combined to form a complete image, video, text or any visible thing on a computer display.
                  {'\n'}
                  {'\n'}
                  A pixel is also known as a picture element.
                </Text>
              </View>
            </View>
          </View>
          <View>
            <View
              style={{
                margin: 10
              }}
            >
              <Text
                style={{
                  color: '#c0c0c0',
                  fontSize: 25,
                  fontWeight: 'bold'
                }}
              >
                1.2 Learning the pixel
              </Text>
              <View>
                <Text
                  style={{
                    margin: 15,
                    color: '#c0c0c0',
                    fontSize: 20
                  }}
                >
                  A pixel comprises of the 3 primary colors.
                  {'\n'}
                  {'\n'}
                  1) Red
                  {'\n'}
                  2) Green
                  {'\n'}
                  3) Blue
                </Text>
                <Image style={{ width: '100%', height: 200, borderRadius: 10 }} resizeMode="contain" source={require('../../media/page1_media_3.png')} />
                <Text
                  style={{
                    margin: 15,
                    color: '#c0c0c0',
                    fontSize: 20
                  }}
                >
                  These colors are used to formulate every possible color. Hence, they are also known as promary colors.
                </Text>
                <Animated.View
                  style={{
                    flexDirection: 'row',
                    padding: 20,
                    justifyContent: 'center'
                  }}
                >
                  <Animated.View
                    style={{
                      width: this.anim1,
                      height: this.anim1,
                      position: 'relative',
                      backgroundColor: 'red'
                    }}
                  >
                  </Animated.View>
                  <Animated.View
                    style={{
                      width: this.anim1,
                      height: this.anim1,
                      backgroundColor: 'green'
                    }}
                  >
                  </Animated.View>
                  <Animated.View
                    style={{
                      width: this.anim1,
                      height: this.anim1,
                      backgroundColor: 'blue'
                    }}
                  >
                  </Animated.View>
                </Animated.View>
                <TouchableOpacity
                  onPress={this.startAnimationOne}
                  disabled={this.state.animating}
                >
                  <Text
                    style={{
                      color: '#c0c0c0',
                      textAlign: 'center'
                    }}
                  >
                    Start Animation
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View>
            <View
              style={{
                margin: 10
              }}
            >
              <Text
                style={{
                  color: '#c0c0c0',
                  fontSize: 25,
                  fontWeight: 'bold'
                }}
              >
                1.3 Pixels are powerful
              </Text>
              <View>
                <Text
                  style={{
                    margin: 15,
                    color: '#c0c0c0',
                    fontSize: 20
                  }}
                >
                  These pixels are used to drawing everything you are seeing on the screen
                </Text>
                <Animated.View
                  style={{
                    flexDirection: 'row',
                    width: 150,
                    height: 150,
                    alignSelf: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Animated.View
                    style={{
                      width: this.anim2,
                      height: this.anim2,
                    }}
                  >
                    <Image style={{ width: '100%', height: 100, borderRadius: 10 }} resizeMode="cover" source={require('../../media/page1_media_4.jpg')} />

                  </Animated.View>
                </Animated.View>
                <TouchableOpacity
                  onPress={this.startAnimationTwo}
                  disabled={this.state.animating}
                >
                  <Text
                    style={{
                      color: '#c0c0c0',
                      textAlign: 'center'
                    }}
                  >
                    Start Animation
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    margin: 15,
                    color: '#c0c0c0',
                    fontSize: 20
                  }}
                >
                  These colors are used to formulate every possible color. Hence, they are also known as promary colors.
                </Text>
              </View>
            </View>
          </View>
          <View>
            <View
              style={{
                margin: 10
              }}
            >
              {/* <Image style={{ margin: -10, position: 'absolute', width: WIDTH, height: HEIGHT - 100, borderRadius: 10 }} resizeMode="cover" source={require('../../media/page1_media_5.png')} /> */}
              <Text
                style={{
                  color: '#c0c0c0',
                  fontSize: 25,
                  fontWeight: 'bold'
                }}
              >
                1.4 Line Drawing
              </Text>
              
              <View>
                <Text
                  style={{
                    margin: 15,
                    color: '#c0c0c0',
                    fontSize: 20
                  }}
                >
                  Using these pixele we will learn how to draw a line, to do this we have multiple algorithms.
                  {'\n'}
                  {'\n'}
                  As a part of this tutorial we will discuss two algorithms
                  {'\n'}
                  {'\n'}
                  1) DDA Line Generation Algorithm
                  {'\n'}
                  {'\n'}
                  2) Bresenham’s Line Generation Algorithm
                </Text>
                <View
                  style={{
                    marginTop: 20,
                  }}
                >
                  <View
                    style={{
                      height: 2,
                      width: '100%',
                      backgroundColor: '#f0f0f0',
                    }}
                  />
                </View>
                <View
                  style={{
                    marginTop: 20,
                  }}
                >
                  <View
                    style={{
                      height: 2,
                      width: '100%',
                      backgroundColor: '#f0f0f0',
                    }}
                  />
                  <View
                    style={{
                      height: 2,
                      width: '100%',
                      backgroundColor: '#f0f0f0',
                    }}
                  />
                </View>
                <View
                  style={{
                    marginTop: 20,
                  }}
                >
                  <View
                    style={{
                      height: 2,
                      width: '100%',
                      backgroundColor: '#f0f0f0',
                    }}
                  />
                </View>
                <View
                  style={{
                    marginTop: 20,
                  }}
                >
                  <View
                    style={{
                      height: 2,
                      width: '100%',
                      backgroundColor: '#f0f0f0',
                    }}
                  />
                  <View
                    style={{
                      height: 2,
                      width: '100%',
                      backgroundColor: '#f0f0f0',
                    }}
                  />
                </View>
                <View
                  style={{
                    marginTop: 20,
                  }}
                >
                  <View
                    style={{
                      height: 2,
                      width: '100%',
                      backgroundColor: '#f0f0f0',
                    }}
                  />
                </View>
                <View
                  style={{
                    marginTop: 20,
                  }}
                >
                  <View
                    style={{
                      height: 2,
                      width: '100%',
                      backgroundColor: '#f0f0f0',
                    }}
                  />
                  <View
                    style={{
                      height: 2,
                      width: '100%',
                      backgroundColor: '#f0f0f0',
                    }}
                  />
                </View>
                <View
                  style={{
                    marginTop: 20,
                  }}
                >
                  <View
                    style={{
                      height: 2,
                      width: '100%',
                      backgroundColor: '#f0f0f0',
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
          <View>
            <View
              style={{
                margin: 10
              }}
            >
              <Text
                style={{
                  color: '#c0c0c0',
                  fontSize: 25,
                  fontWeight: 'bold'
                }}
              >
                1.5 How Line Drawing Looks like
              </Text>
              <Animated.View
                style={{
                  transform: [{
                    rotate: '90deg'
                  }],
                  width: 150,
                  alignSelf: 'center',
                  height: 150,
                  backgroundColor: 'red'
                }}
              >
                <Animated.View
                  style={{
                    height: 2,
                    width: this.anim3,
                    backgroundColor: '#f0f0f0',
                  }}
                />
                
                <Animated.View
                  style={{
                    position: 'relative',
                    bottom: 50,
                    height: 2,
                    width: this.anim3,
                    backgroundColor: '#f0f0f0',
                  }}
                />
                <Animated.View
                  style={{
                    position: 'relative',
                    bottom: 100,
                    height: 2,
                    width: this.anim3,
                    backgroundColor: '#f0f0f0',
                  }}
                />
                <Animated.View
                  style={{
                    position: 'relative',
                    bottom: 100,
                    height: 2,
                    width: this.anim3,
                    backgroundColor: '#f0f0f0',
                  }}
                />
                <Animated.View
                  style={{
                    height: 2,
                    width: this.anim3,
                    backgroundColor: '#f0f0f0',
                  }}
                />
              </Animated.View>
              <Animated.View
                style={{
                  transform: [{
                    rotate: '45deg'
                  }],
                  marginTop: 50,
                  marginBottom: 50,
                  width: 150,
                  alignSelf: 'center',
                  height: 150,
                  backgroundColor: 'green'
                }}
              >
                <Animated.View
                  style={{
                    height: 2,
                    width: this.anim3,
                    backgroundColor: '#f0f0f0',
                  }}
                />

                <Animated.View
                  style={{
                    height: 2,
                    width: this.anim3,
                    backgroundColor: '#f0f0f0',
                  }}
                />
                <Animated.View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    height: 2,
                    width: this.anim3,
                    backgroundColor: '#f0f0f0',
                  }}
                />
              </Animated.View>
              <Animated.View
                style={{
                  transform: [{
                    rotate: '-90deg'
                  }],
                  width: 160,
                  alignSelf: 'center',
                  height: 160,
                  backgroundColor: 'blue'
                }}
              >
                <Animated.View
                  style={{
                    height: 2,
                    width: this.anim3,
                    backgroundColor: '#f0f0f0',
                  }}
                />

                <Animated.View
                  style={{
                    height: 2,
                    width: this.anim3,
                    backgroundColor: '#f0f0f0',
                  }}
                />
                <Animated.View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    height: 2,
                    width: this.anim3,
                    backgroundColor: '#f0f0f0',
                  }}
                />
                <Animated.View
                  style={{
                    position: 'absolute',
                    top: 0,
                    height: 2,
                    width: this.anim3,
                    backgroundColor: '#f0f0f0',
                  }}
                />
              </Animated.View>

              <TouchableOpacity
                disabled={this.state.animating}
                onPress={this.startAnimationThree}
              >
                <Text
                  style={{
                    color: '#f0f0f0',
                    textAlign: 'center',
                    margin: 20
                  }}
                >
                  Start Animation
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <View
              style={{
                margin: 10
              }}
            >
              <Text
                style={{
                  color: '#c0c0c0',
                  fontSize: 25,
                  fontWeight: 'bold'
                }}
              >
                1.6 DDA Line Drawing Algorithm
              </Text>
              <Image style={{ width: '100%', marginTop: 30, height: 300, borderRadius: 10, backgroundColor: '#fff' }} resizeMode="contain" source={require('../../media/page1_media_6.jpg')} />
              <View>
                <Text
                  style={{
                    margin: 15,
                    color: '#c0c0c0',
                    fontWeight: 'bold',
                    fontSize: 20
                  }}
                >
                A line connects two points. It is a basic element in graphics. 
                {'\n'}
                {'\n'}
                To draw a line, you need two points between which you can draw a line. 
                {'\n'}
                {'\n'}
                In the following three algorithms, we refer the one point of line as X0,Y0
                and the second point of line as X1,Y1.
                </Text>
                
              </View>
            </View>
          </View>
          <View>
            <View
              style={{
                margin: 10
              }}
            >
              <Text
                style={{
                  color: '#a0a0a0',
                  fontSize: 25,
                  // fontWeight: '400'
                }}
              >
                1.6 DDA Line Drawing Algorithm ( Continued... )
              </Text>
              {/* <Image style={{ width: '100%', marginTop: 30, height: 300, borderRadius: 10, backgroundColor: '#fff' }} resizeMode="contain" source={require('../../media/page1_media_6.jpg')} /> */}
              <View>
                <Text
                  style={{
                    margin: 15,
                    color: '#c0c0c0',
                    fontSize: 20
                  }}
                >
                  Step 1 − Get the input of two end points (X0,Y0) and (X1,Y1).
                  {'\n'}
                  {'\n'}
                  Step 2 − Calculate the difference between two end points.
                  {'\n'}
                  {'\n'}
                  Step 3 − Based on the calculated difference in step-2, you need to identify the number of steps to put pixel. If dx > dy, then you need more steps in x coordinate; otherwise in y coordinate.
                  {'\n'}
                  {'\n'}
                  Step 4 − Calculate the increment in x coordinate and y coordinate.
                  {'\n'}
                  {'\n'}
                  Step 5 − Put the pixel by successfully incrementing x and y coordinates accordingly and complete the drawing of the line.
                </Text>
                
              </View>
            </View>
          </View>
          <View>
            <View
              style={{
                margin: 10
              }}
            >
              <Text
                style={{
                  color: '#c0c0c0',
                  fontSize: 25,
                  fontWeight: 'bold'
                }}
              >
                1.7 Bresenham’s Line Drawing Algorithm
              </Text>
              <Image style={{ width: '100%', marginTop: 30, height: 300, borderRadius: 10, backgroundColor: '#fff' }} resizeMode="contain" source={require('../../media/page1_media_6.jpg')} />
              <View>
                <Text
                  style={{
                    margin: 15,
                    color: '#c0c0c0',
                    fontWeight: 'bold',
                    fontSize: 20
                  }}
                >
                The Bresenham algorithm is another incremental scan conversion algorithm.
                {'\n'}
                {'\n'}
                The big advantage of this algorithm is that, it uses only integer calculations.
                {'\n'}
                {'\n'}
                Moving across the x axis in unit intervals and at each step choose between two different y coordinates.
                </Text>
                
              </View>
            </View>
          </View>
          <View>
            <View
              style={{
                margin: 10
              }}
            >
              <Text
                style={{
                  color: '#a0a0a0',
                  fontSize: 25,
                  // fontWeight: '400'
                }}
              >
                1.6 Bresenham’s Line Drawing Algorithm ( Continued... )
              </Text>
              <Image style={{ width: '100%', marginTop: 30, height: 300, borderRadius: 10, backgroundColor: '#fff' }} resizeMode="contain" source={require('../../media/page1_media_8.jpg')} />
              <View
                style={{
                  justifyContent: 'center'
                }}
              >
                <Text
                  style={{
                    margin: 15,
                    color: '#c0c0c0',
                    justifyContent: 'center',
                    fontSize: 20
                  }}
                >
                  Step 1 − Input the two end-points of line, storing the left end-point in (x0,y0).
                  {'\n'}
                  {'\n'}
                  Step 2 − Plot the point (x0,y0).
                  {'\n'}
                  {'\n'}
                  Step 3 − Calculate the constants dx, dy, 2dy, and (2dy – 2dx) and get the first value for the decision parameter as −
                  {'\n'}
                  p0=2dy−dx
                  {'\n'}
                </Text>
              </View>
            </View>
          </View>
          <View>
            <View
              style={{
                margin: 10
              }}
            >
              <Text
                style={{
                  color: '#a0a0a0',
                  fontSize: 25,
                  // fontWeight: '400'
                }}
              >
                1.6 Bresenham’s Line Drawing Algorithm ( Continued... )
              </Text>
              {/* <Image style={{ width: '100%', marginTop: 30, height: 300, borderRadius: 10, backgroundColor: '#fff' }} resizeMode="contain" source={require('../../media/page1_media_6.jpg')} /> */}
              <View
                style={{
                  justifyContent: 'center'
                }}
              >
                <Text
                  style={{
                    margin: 15,
                    color: '#c0c0c0',
                    justifyContent: 'center',
                    fontSize: 20
                  }}
                >
                  Step 4 − At each Xk along the line, starting at k = 0, perform the following test −
                  {'\n'}
                  If pk less than zero, the next point to plot is 
                  {'\n'}
                  (xk+1,yk) and pk+1=pk+2dy
                  {'\n'}
                  Otherwise,
                  {'\n'}
                  (xk,yk+1)
                  {'\n'}
                  pk+1=pk+2dy−2dx
                  {'\n'}
                  {'\n'}
                  Step 5 − Repeat step 4 (dx – 1) times.
                  {'\n'}
                  For m > 1, find out whether you need to increment x while incrementing y each time.
                  {'\n'}
                  After solving, the equation for decision parameter Pk
                  will be very similar, just the x and y in the equation gets interchanged.
                  {'\n'}
                </Text>
              </View>
            </View>
          </View>
          
          <View>
            <View
              style={{
                margin: 10
              }}
            >
              <Text
                style={{
                  color: '#c0c0c0',
                  fontSize: 25,
                  fontWeight: 'bold'
                }}
              >
                MCQ TEST
              </Text>
              <View
                style={{
                  justifyContent: 'center'
                }}
              >
                <Text
                  style={{
                    margin: 15,
                    color: '#c0c0c0',
                    justifyContent: 'center',
                    fontSize: 20
                  }}
                >
                  Step 4 − At each Xk along the line, starting at k = 0, perform the following test −
                  {'\n'}
                  If pk less than zero, the next point to plot is 
                  {'\n'}
                  (xk+1,yk) and pk+1=pk+2dy
                  {'\n'}
                  Otherwise,
                  {'\n'}
                  (xk,yk+1)
                  {'\n'}
                  pk+1=pk+2dy−2dx
                  {'\n'}
                  {'\n'}
                  Step 5 − Repeat step 4 (dx – 1) times.
                  {'\n'}
                  For m > 1, find out whether you need to increment x while incrementing y each time.
                  {'\n'}
                  After solving, the equation for decision parameter Pk
                  will be very similar, just the x and y in the equation gets interchanged.
                  {'\n'}
                </Text>
              </View>
            </View>
          </View>
          
        </Swiper>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center"
  },
  webglView: {
    alignSelf: 'center',
    width: 300,
    height: 300
  }
});