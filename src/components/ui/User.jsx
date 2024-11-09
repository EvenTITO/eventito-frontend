import { User as UserInfo } from '@nextui-org/user'

export default function User({
  username,
  email,
  image = null,
  imageSize = "md",
}) {
  const imageAlt = username ? username : email
  const imageSrc = image
    ? image
    : `https://api.dicebear.com/6.x/initials/svg?seed=${imageAlt}`
  return (
    <UserInfo
      name={username}
      description={<p className="text-gray-500">{email}</p>}
      avatarProps={{
        src: imageSrc,
        size: imageSize,
      }}
    />
  )
}
