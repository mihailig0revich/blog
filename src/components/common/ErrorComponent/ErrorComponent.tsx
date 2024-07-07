function ErrorComponent({ err = 'something went wrong' }: { err?: string }) {
  return (
    <p style={{ color: 'red', fontFamily: 'Inter UI', fontSize: '18px', lineHeight: '28px', textAlign: 'left' }}>
      {err}
    </p>
  );
}

export default ErrorComponent;
