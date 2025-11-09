import logo from "../../assets/logo.png";

export default function HomePainel() {
  return (
    <div
      className="flex items-center justify-center w-full h-full bg-white"
      style={{
        backgroundImage: `url(${logo})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "contain", 
        minHeight: "calc(100vh - 0px)", 
      }}
    ></div>
  );
}
