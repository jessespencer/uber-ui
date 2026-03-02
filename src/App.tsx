import { useState } from 'react'
import bgImage from './images/bg.jpg'
import { Button } from './components/Button'
import { Dropdown } from './components/Dropdown'
import { SearchInput } from './components/SearchInput'
import { SegmentedControl } from './components/SegmentedControl'
import { Checkbox } from './components/Checkbox'
import { Pagination } from './components/Pagination'
import { Switch } from './components/Switch'
import { Slider } from './components/Slider'
import { RockerToggle } from './components/RockerToggle'
import { Toast } from './components/Toast'
import { ChevronLeftIcon, CloseIcon, PlusIcon, CheckIcon, XCircleIcon, HomeIcon, BoltIcon, StarIcon, BellIcon } from './components/icons'

const dropdownOptions = [
  { label: 'Option 1' },
  { label: 'Option 2' },
  { label: 'Option 3' },
]

export default function App() {
  const [pressed, setPressed] = useState(true)
  const [iconPressed, setIconPressed] = useState(true)
  const [dropdownValue, setDropdownValue] = useState<string | undefined>()
  const [searchValue, setSearchValue] = useState('Uber Dark UI Kit V3')
  const [segmentedValue, setSegmentedValue] = useState('home')
  const [page, setPage] = useState(2)
  const [check1, setCheck1] = useState(true)
  const [check2, setCheck2] = useState(false)
  const [switch1, setSwitch1] = useState(true)
  const [switch2, setSwitch2] = useState(false)
  const [slider1, setSlider1] = useState(60)
  const [rocker1, setRocker1] = useState(true)
  const [rocker2, setRocker2] = useState(false)

  return (
    <div
      className="min-h-screen bg-center bg-no-repeat bg-cover bg-fixed flex items-center justify-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="flex flex-col gap-[32px] p-8">

        {/* Row 1: Icon buttons + text buttons */}
        <div className="flex items-center gap-[48px]">
          <div className="flex items-center gap-[16px]">
            <Button size="small" variant="normal">
              <ChevronLeftIcon />
            </Button>
            <Button size="small" variant="hover">
              <PlusIcon />
            </Button>
            <Button size="small" variant="focus">
              <XCircleIcon />
            </Button>
            <Button size="small" variant={iconPressed ? 'active' : 'normal'} onClick={() => setIconPressed(!iconPressed)}>
              <CheckIcon />
            </Button>
            <Button size="small" disabled>
              <CloseIcon />
            </Button>
          </div>

          <div className="flex items-center gap-[16px]">
            <Button variant="normal">Normal</Button>
            <Button variant="hover">Hover</Button>
            <Button variant="focus">Focus</Button>
            <Button variant={pressed ? 'active' : 'normal'} onClick={() => setPressed(!pressed)}>Pressed</Button>
            <Button disabled>Disabled</Button>
          </div>
        </div>

        {/* Row 2: Dropdown + Search + Segmented Control */}
        <div className="flex items-center gap-[32px]">
          <Dropdown
            className="flex-1"
            options={dropdownOptions}
            value={dropdownValue}
            onChange={setDropdownValue}
            placeholder="Dropdown"
          />
          <SearchInput
            className="flex-1"
            value={searchValue}
            onChange={setSearchValue}
            placeholder="Search..."
          />
          <SegmentedControl
            className="flex-1"
            options={[
              { value: 'home', icon: <HomeIcon /> },
              { value: 'bolt', icon: <BoltIcon /> },
              { value: 'star', icon: <StarIcon /> },
              { value: 'bell', icon: <BellIcon /> },
            ]}
            value={segmentedValue}
            onChange={setSegmentedValue}
          />
        </div>

        {/* Row 3: Rocker Toggles + Switch + Pagination + Checkboxes + Slider */}
        <div className="flex gap-[48px]">
          <div className="flex items-center gap-[16px]">
            <RockerToggle checked={rocker1} onChange={setRocker1} />
            <RockerToggle checked={rocker2} onChange={setRocker2} />
          </div>
          <div className="flex flex-col gap-[16px]">
            <Switch checked={switch1} onChange={setSwitch1} />
            <Switch checked={switch2} onChange={setSwitch2} />
          </div>
          <div className="flex flex-col gap-[16px] flex-1">
            <div className="flex items-center gap-[48px]">
              <Pagination total={5} current={page} onChange={setPage} />
              <div className="flex items-center gap-[16px]">
                <Checkbox checked={check1} onChange={setCheck1} />
                <Checkbox checked={check2} onChange={setCheck2} />
              </div>
              <Toast>Status: Online</Toast>
            </div>
            <div className="flex items-center flex-1">
              <Slider className="flex-1" value={slider1} onChange={setSlider1} />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
