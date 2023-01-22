export interface CarouselProps {
  data: DeviceProps[];
}

export interface DeviceProps {
  nome: string
  is_bluetooth: boolean
  user_admin_id: number
  id: number
}