export const fragmentShader = /*glsl*/ `	
uniform float uProgress;
uniform vec2 u_resolution;	
uniform sampler2D uTexture;
uniform sampler2D uTexture2;

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying float vWave;
varying vec2 vMause;
varying float vFormas;



#define PI 3.14159265359



//  float easeOutCirc(float x) {
// 	return sqrt(1.0 - pow(x - 1.0, 2.0));
// }

float createCirculoExpansivo(float r, float grad , float radioST ,  float speed){

	float deceroauno = (vWave  * speed) * (1.0 - speed) ;	
	float onda =  deceroauno * 12.0;
	
	
	return smoothstep(r  , r  + grad, radioST  - onda );
 
 }	
	
void main(){
	vec2 st = gl_FragCoord.xy / u_resolution.xy;
	vec2 centro = vec2(  vMause.x * 0.5 + 0.5, vMause.y * 0.5 + 0.5);
	vec2 position = vec2(0.5, 0.5);
    vec2 toCenter = centro - st;
    float radius = length(toCenter)* 2.0;
    float angle = atan(toCenter.y,toCenter.x);
    

    

    

	// circle1
    
	float radio =  0.1;
	float grad =  0.1;
	float speed1 =  0.1;
	float speed2 = 0.2;
	float speed3 = 0.3;
	float speed4 = 0.4;
    float speed5 = 0.8;
	// float deceroauno = fract( uProgress * 0.2);
	// float onda =  easeOutCirc(deceroauno);
	// 	circle 1 circle Aqui le restamos la figura un poco mas pequeña en negro 0.0

    // 	circle 1 circle Aqui le restamos la figura un poco mas pequeña en negro 0.0
    float circle1  = 1.0 - createCirculoExpansivo(radio, grad , radius,  speed1);
          circle1 -= 1.0 - createCirculoExpansivo(radio * 0.3 , grad, radius, speed1);
    // circle 2 -----------------------------
    float circle2  = 0.5 - createCirculoExpansivo(radio, grad , radius, speed2);
          circle2 -= 0.5 - createCirculoExpansivo(radio * 0.6 , grad, radius, speed2);
      
    // // circle  3-----------------------------
    float circle3  = 0.3 - createCirculoExpansivo(radio, grad , radius, speed3);
          circle3 -= 0.3 - createCirculoExpansivo(radio * 0.8 , grad, radius, speed3);
      
    // // circle 4 -----------------------------
    float circle4  = 0.2 - createCirculoExpansivo(radio, grad , radius, speed4);
          circle4 -= 0.2 - createCirculoExpansivo(radio * 0.9 , grad, radius, speed4);
      
    // // circle 5 -----------------------------
    float circle5  = 0.1 - createCirculoExpansivo(radio, grad , radius, speed5);
          circle5 -= 0.1 - createCirculoExpansivo(radio * 0.95 , grad, radius, speed5);
      
    vec3 formas = vec3( circle1  + circle2 + circle3 + circle4 + circle5  ) * 1.0 - vWave ;     

 
	
	
	
	
	vec4 t1 = texture2D(uTexture, vUv);
	vec4 t2 = texture2D(uTexture2, vUv);

	vec4 colorBack = vec4(1, 1, 1,1);
    vec4 colorCirc = vec4(0.3 + vWave *0.5, 0.6, 0.8 * vWave, 1.0 - vWave);

	vec4 mixing = mix( colorBack, colorCirc,  vUv.y * formas.x );	
	vec4 mixing2 = mix(t1,t2,  vWave);
	
	gl_FragColor =  mixing2 * mixing; 
	// gl_FragColor =   vec4( vec3( 1.0 - formas),1.0) * t1;
	
	


	// TODO: Aqui pruebo usar las vUv a ver si cambia el color---------------
// 
// 	vec3 color1 = vec3(0.79, 0.35, 0.40);
// 	vec3 color2 = vec3(0.1, 1.0, 0.0);
// 	vec3 color3 = vec3(0.0, 0.0, 0.0);
// 
// 	float formaC = smoothstep( 0.4,  0.5, vUv.y );
// 
// 	vec3 mixing = mix( color1, color2 * formaC, vUv.y );
// 
// 	gl_FragColor = vec4( vec3(formaC),1.0);
	
}	
`;
