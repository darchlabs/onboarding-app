import { Base } from "./base";
import { Characteristics } from "./characteristics";
import { Footer } from "./footer";
import { Principal } from "./principal";
import { Showcase } from "./showcase";

export function Home() {
  return (
    <Base>
      <Principal />
      <Characteristics />
      <Showcase />
      <Footer />
    </Base>
  );
}
