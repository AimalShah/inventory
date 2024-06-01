import { Button } from './ui/button'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faPenToSquare ,faFolder , faGear} from "@fortawesome/free-solid-svg-icons"

export default function Sidenav() {
  return (
    <div className='h-[88.8vh] w-28 border-r p-2 flex lg:flex-col gap-4'>
      <Button variant={'default'} className='h-auto flex flex-col font-bold gap-2'>
      <FontAwesomeIcon icon={faFolder} className='text-xl' />
        Projects
        </Button>
        <Button variant={'ghost'} className='h-auto flex flex-col font-bold gap-2'>
      <FontAwesomeIcon icon={faPenToSquare} className='text-xl' />
      Add New
      </Button>
      <Button variant={'ghost'} className='h-auto flex flex-col font-bold gap-2'>
      <FontAwesomeIcon icon={faGear} className='text-xl' />
      Settings
      </Button>
    </div>
  )
}
