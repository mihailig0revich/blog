function ErrorComponent({ err = 'something went wrong' }: { err?: string }) {
  return (
    <p
      style={{
        textAlign: 'center',
        color: 'red',
        fontFamily: 'Inter UI',
        fontSize: '18px',
        lineHeight: '28px',
      }}
    >
      {err}
    </p>
  );
}

export default ErrorComponent;
