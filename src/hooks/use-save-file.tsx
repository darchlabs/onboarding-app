export const SaveFile = ({ children, data }: { children: JSX.Element | string; data: string }): JSX.Element => {
  const fileData = new Blob([data], { type: "text/plain" });
  const downloadLink = window.URL.createObjectURL(fileData);

  
  return (
    <>
      <a download="credentials.pem" href={downloadLink}>
        {children}
      </a>
    </>
  );
};
