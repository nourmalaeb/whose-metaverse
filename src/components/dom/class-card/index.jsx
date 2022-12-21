import Image from 'next/image'

const Card = ({ title, content, bgcolor = `#150A33`, pic }) => {
  return (
    <div style={{ backgroundColor: bgcolor }}>
      <Image src={pic} alt='' />
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  )
}

export default Card
