export default function LoadingIcon() {
  return (
    <svg
      width="100"
      height="150"
      viewBox="0 0 70 120"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="10"
        y="40"
        fontSize="30"
        fontFamily="Times New Roman, San Francisco, PingFang SC"
        fill="rgb(60, 71, 112)"
      >
        T
        <animate
          attributeName="font-size"
          from="30"
          to="40"
          begin="0s"
          dur="0.8s"
          values="30;40;30;30"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </text>
      <text
        x="40"
        y="60"
        fontSize="30"
        fontFamily="Times New Roman, San Francisco, PingFang SC"
        fill="rgb(60, 71, 112)"
      >
        O
        <animate
          attributeName="font-size"
          from="30"
          to="40"
          begin="0.2s"
          dur="0.8s"
          values="30;40;30;30"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </text>
      <text
        x="10"
        y="80"
        fontSize="30"
        fontFamily="Times New Roman, San Francisco, PingFang SC"
        fill="rgb(60, 71, 112)"
      >
        B
        <animate
          attributeName="font-size"
          from="30"
          to="40"
          begin="0.4s"
          dur="0.8s"
          values="30;40;30;30"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </text>
      <text
        x="40"
        y="100"
        fontSize="30"
        fontFamily="Times New Roman, San Francisco, PingFang SC"
        fill="rgb(60, 71, 112)"
      >
        E
        <animate
          attributeName="font-size"
          from="30"
          to="40"
          begin="0.6s"
          dur="0.8s"
          values="30;40;30;30"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </text>
    </svg>
  );
}
