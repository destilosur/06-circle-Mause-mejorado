export const vertexShader = /*glsl*/ `
uniform float uProgress;
uniform vec2 u_resolution;
uniform float uWave;
uniform vec2 uMause;

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying float vWave;
varying vec2 vMause;
varying float vFormas;

#define PI 3.14159265359

float createCirculoExpansivo(float r, float grad , float radioST ,  float speed){

	float deceroauno = (uWave  * speed ) * (1.0 - speed) ;	
	float onda =  deceroauno * 12.0;
	
	
	return smoothstep(r  , r  + grad, radioST  - onda );
 
 }



 void main()	{

    
    vMause = uMause;
    vWave = uWave;
    vNormal = normal;
   
   

    vec2 centro = vec2(  uMause.x * 0.5 + 0.5, uMause.y * 0.5 + 0.5) - uv;
    vec2 c = vec2(0.5, 0.5) - uv;
    float radio = length( centro );
    float angulo = atan(centro.x , centro.y);
    vec3 pos = position;     
    


    float radioCircle =  0.01;
	float grad =  0.1;
	float speed1 =  0.07;
    float speed2 = 0.2;
	float speed3 = 0.3;
	float speed4 = 0.4;
    float speed5 = 0.8;

    // circle1
    float circle1  = 2.0 - createCirculoExpansivo(radioCircle, grad , radio,  speed1);
    circle1 -= 2.0 - createCirculoExpansivo(radioCircle * 0.3 , grad + 0.1, radio, speed1);

     // circle 2 -----------------------------
     float circle2  = 1.5 - createCirculoExpansivo(radioCircle, grad , radio, speed2);
     circle2 -= 1.5 - createCirculoExpansivo(radioCircle * 0.6 , grad, radio, speed2);
 
    // circle  3-----------------------------
    float circle3  = 1.3 - createCirculoExpansivo(radioCircle, grad , radio, speed3);
        circle3 -= 1.3 - createCirculoExpansivo(radioCircle * 0.8 , grad, radio, speed3);
    
    // // circle 4 -----------------------------
    float circle4  = 1.2 - createCirculoExpansivo(radioCircle, grad , radio, speed4);
        circle4 -= 1.2 - createCirculoExpansivo(radioCircle * 0.9 , grad, radio, speed4);
    
    // // circle 5 -----------------------------
    float circle5  = 1.1 - createCirculoExpansivo(radioCircle, grad , radio, speed5);
        circle5 -= 1.1 - createCirculoExpansivo(radioCircle * 0.95 , grad, radio, speed5);
    
    float formas = float( circle1  + circle2 + circle3 + circle4 + circle5  ); 


    
    

       


    
    pos = vec3(pos.x, (pos.y + formas) , pos.z);
    
    
    
    
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);


    vPosition = pos;

    // Aqui intente pasarle las ondas para no tener que crear las mismas en el fragment
    vFormas = formas;
    vUv = uv;
    
    
}		

	
		
`;
