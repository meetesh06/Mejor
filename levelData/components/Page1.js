import React from "react";
import {
  StyleSheet,
  View,
  Text
} from "react-native";
import { WebGLView } from "react-native-webgl";
import THREE from "../helpers/three";

export default class App extends React.Component {
  // requestId: *;
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
      <View style={styles.container}>
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
              marginRight: 10,
              borderBottomWidth: 2,
              borderBottomColor: '#c0c0c0',
              borderRadius: 10,
            }}
          />
          <Text
            style={{
              margin: 10,
              color: '#c0c0c0'
            }}
          >
            Aiyyo, I remember Marvin Gaye, used to sing to me
            He had me feelin' like black was tha thing to be
            And suddenly tha ghetto didn't seem so tough
            And though we had it rough, we always had enough
            I huffed and puffed about my curfew and broke the rules
            Ran with the local crew, and had a smoke or two
            And I realize momma really paid the price
            She nearly gave her life, to raise me right
            And all I had to give her was my pipe dream
            Of how I'd rock the mic, and make it to tha bright screen
            I'm tryin' to make a dollar out of fifteen cents
            It's hard to be legit and still pay your rent
            And in the end it seems I'm headin' for tha pen
            I try and find my friends, but they're blowin' in the wind
          </Text>
        </View>
      </View>
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
    width: 300,
    height: 300
  }
});