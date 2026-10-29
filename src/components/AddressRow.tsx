import { Icon } from "../icons/Icon"
import { IconName } from "../types"
import { Button } from "./ui/Button"

export interface AddressRowProps {
  label?: string
  address: string
  eta?: string
  onChange?: () => void
  actionText?: string
  iconName?: IconName
  className?: string
}

export function AddressRow({
  label,
  address,
  eta,
  onChange,
  actionText = "Change",
  iconName = "pin",
  className = "",
}: AddressRowProps): React.JSX.Element {
  return (
    <div className={`ui-address-row ${className}`.trim()}>
      <div className="ui-address-row-icon" aria-hidden="true">
        <Icon name={iconName} size={20} />
      </div>
      <div className="ui-address-row-info">
        <div className="ui-address-row-header">
          {label && <strong className="ui-address-row-label">{label}</strong>}
          {eta && <span className="ui-address-row-eta">{eta}</span>}
        </div>
        <p className="ui-address-row-text">{address}</p>
      </div>
      {onChange && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onChange}
          aria-label={`${actionText} delivery address, currently ${label || address}`}
          className="ui-address-row-action"
        >
          {actionText}
        </Button>
      )}
    </div>
  )
}

export default AddressRow
