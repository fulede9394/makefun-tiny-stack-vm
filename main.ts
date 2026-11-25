import{mkdirSync,readdirSync,readFileSync,writeFileSync}from'node:fs';
import{join}from'node:path';
function run(p,q){
 const n=p.length,D=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),O=new Uint8Array(65536);
 let s=0,c=0,l=0,i=0,pc=0,t=0;
 const T=e=>[O.subarray(0,l),e];
 for(;;){
  if(t===1e6)return T(10);
  if(pc<0||pc>=n)return T(9);
  const o=p[pc];
  if(o===16){t++;if(s<2)return T(2);D[s-2]=D[s-2]+D[s-1];s--;pc++;continue;}
  if(o===48){t++;if(pc+2>=n)return T(9);pc=pc+3+((p[pc+1]|p[pc+2]<<8)<<16>>16);continue;}
  if(o<8){
   t++;
   if(o===0)return T(0);
   if(o===1){
    if(pc+1>=n)return T(9);
    if(s>255)return T(3);
    D[s++]=(p[pc+1]<<24)>>24;pc+=2;
   }else if(o===2){
    if(pc+4>=n)return T(9);
    if(s>255)return T(3);
    D[s++]=p[pc+1]|p[pc+2]<<8|p[pc+3]<<16|p[pc+4]<<24;pc+=5;
   }else if(o===3){
    if(s<1)return T(2);
    s--;pc++;
   }else if(o===4){
    if(s<1)return T(2);
    if(s>255)return T(3);
    D[s]=D[s-1];s++;pc++;
   }else if(o===5){
    if(s<2)return T(2);
    const a=D[s-1];D[s-1]=D[s-2];D[s-2]=a;pc++;
   }else if(o===6){
    if(s<2)return T(2);
    if(s>255)return T(3);
    D[s]=D[s-2];s++;pc++;
   }else{
    if(s<3)return T(2);
    const a=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=a;pc++;
   }
  }else if(o<16)return T(5);
  else if(o<35){
   t++;
   if(o===23){
    if(s<1)return T(2);
    D[s-1]=-D[s-1];pc++;
   }else if(o===27){
    if(s<1)return T(2);
    D[s-1]=~D[s-1];pc++;
   }else if(o===31)return T(5);
   else{
    if(s<2)return T(2);
    const b=D[s-1],a=D[s-2];let r;
    if(o===16)r=a+b;
    else if(o===17)r=a-b;
    else if(o===18)r=Math.imul(a,b);
    else if(o===19){if(!b)return T(4);r=a===-2147483648&&b===-1?a:(a/b)|0;}
    else if(o===20){if(!b)return T(4);r=a%b;}
    else if(o===21){if(!b)return T(4);r=Math.floor((a>>>0)/(b>>>0));}
    else if(o===22){if(!b)return T(4);r=(a>>>0)%(b>>>0);}
    else if(o===24)r=a&b;
    else if(o===25)r=a|b;
    else if(o===26)r=a^b;
    else if(o===28)r=a<<b;
    else if(o===29)r=a>>b;
    else if(o===30)r=a>>>b;
    else if(o===32)r=a===b?1:0;
    else if(o===33)r=a<b?1:0;
    else r=(a>>>0)<(b>>>0)?1:0;
    D[s-2]=r;s--;pc++;
   }
  }else if(o<48)return T(5);
  else if(o<53){
   t++;
   if(o===48){
    if(pc+2>=n)return T(9);
    pc=pc+3+((p[pc+1]|p[pc+2]<<8)<<16>>16);
   }else if(o===49||o===50){
    if(pc+2>=n)return T(9);
    if(s<1)return T(2);
    const v=D[--s],rel=((p[pc+1]|p[pc+2]<<8)<<16)>>16;
    pc+=3;
    if((o===49)===(v===0))pc+=rel;
   }else if(o===51){
    if(pc+2>=n)return T(9);
    if(c===64)return T(7);
    C[c++]=pc+3;pc=p[pc+1]|p[pc+2]<<8;
   }else{
    if(c===0)return T(8);
    pc=C[--c];
   }
  }else if(o<64)return T(5);
  else if(o<66){
   t++;
   if(o===64){
    if(s<1)return T(2);
    const a=D[s-1];
    if(a<0||a>255)return T(6);
    D[s-1]=M[a];pc++;
   }else{
    if(s<2)return T(2);
    const a=D[s-1];
    if(a<0||a>255)return T(6);
    M[a]=D[s-2];s-=2;pc++;
   }
  }else if(o<80)return T(5);
  else if(o<84){
   t++;
   if(o===80){
    if(s<1)return T(2);
    const g=String(D[s-1]);
    if(l+g.length>65536)return T(11);
    s--;
    for(let k=0;k<g.length;k++)O[l++]=g.charCodeAt(k);
    pc++;
   }else if(o===81){
    if(s<1)return T(2);
    if(l>=65536)return T(11);
    O[l++]=D[--s]&255;pc++;
   }else if(o===82){
    if(s>255)return T(3);
    D[s++]=i<q.length?q[i++]:-1;pc++;
   }else{
    if(s<1)return T(2);
    return[O.subarray(0,l),D[--s]&255];
   }
  }else return T(5);
 }
}
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
for(const id of readdirSync(I).sort()){
 const[b,e]=run(readFileSync(join(I,id,'program.bin')),readFileSync(join(I,id,'input.bin')));
 mkdirSync(join(O,id),{recursive:true});
 writeFileSync(join(O,id,'stdout.bin'),b);
 writeFileSync(join(O,id,'exit.txt'),e+'\n');
}
