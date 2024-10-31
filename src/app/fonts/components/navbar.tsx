import {
  Avatar,
  Dropdown,
  DropdownButton, DropdownDivider,
  DropdownItem, DropdownLabel,
  DropdownMenu,
  Navbar,
  NavbarItem,
  NavbarSection,
  NavbarSpacer
} from "@/core";
import {
  ArrowRightStartOnRectangleIcon,
  Cog8ToothIcon,
  InboxIcon,
  LightBulbIcon,
  MagnifyingGlassIcon,
  ShieldCheckIcon,
  UserIcon
} from "@heroicons/react/16/solid";

export const CNavbar = () => {
  return   <Navbar>
    <NavbarSpacer />
    <NavbarSection>
      <NavbarItem href="/search" aria-label="Search">
        <MagnifyingGlassIcon />
      </NavbarItem>
      <NavbarItem href="/inbox" aria-label="Inbox">
        <InboxIcon />
      </NavbarItem>
      <Dropdown>
        <DropdownButton as={NavbarItem}>
          <Avatar src="/profile-photo.jpg" square />
        </DropdownButton>
        <DropdownMenu className="min-w-64" anchor="bottom end">
          <DropdownItem href="/my-profile">
            <UserIcon />
            <DropdownLabel>My profile</DropdownLabel>
          </DropdownItem>
          <DropdownItem href="/settings">
            <Cog8ToothIcon />
            <DropdownLabel>Settings</DropdownLabel>
          </DropdownItem>
          <DropdownDivider />
          <DropdownItem href="/privacy-policy">
            <ShieldCheckIcon />
            <DropdownLabel>Privacy policy</DropdownLabel>
          </DropdownItem>
          <DropdownItem href="/share-feedback">
            <LightBulbIcon />
            <DropdownLabel>Share feedback</DropdownLabel>
          </DropdownItem>
          <DropdownDivider />
          <DropdownItem href="/logout">
            <ArrowRightStartOnRectangleIcon />
            <DropdownLabel>Sign out</DropdownLabel>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </NavbarSection>
  </Navbar>
}