//
// This web interface has been quickly thrown together. It's not production code.
//

components = {}

components.editButton = () => {
    return $("<a href=\"#\" class=\"fas fa-edit\" title=\"Edit\"></a>")
}

components.deleteButton = () => {
    return $("<a href=\"#\" class=\"fas fa-trash-alt\" title=\"Delete\"></a>")
}

components.seekButton = () => {
    return $("<a href=\"#\" class=\"fas fa-arrows-alt-h\" title=\"Seek\"></a>")
}

components.seekButton = () => {
    return $("<a href=\"#\" class=\"fas fa-arrows-alt-h\" title=\"Seek\"></a>")
}

components.cutButton = () => {
    return $("<a href=\"#\" class=\"fas fa-cut\" title=\"Cut\"></a>")
}

components.overlayButton = () => {
    return $("<a href=\"#\" class=\"fas fa-layer-group\" title=\"Overlay\"></a>")
}

components.removeButton = () => {
    return $("<a href=\"#\" class=\"fas fa-eye-slash\" title=\"Remove from mix\"></a>")
}

components.mutedButton = () => {
    return $("<a href=\"#\" class=\"fas fa-volume-off\" title=\"Unmute\"></a>")
}

components.unmutedButton = () => {
    return $("<a href=\"#\" class=\"fas fa-volume-up\" title=\"Mute\"></a>")
}

components.stateIcon = (state, currentState, linkClassName) => {
    var selected = state == currentState
    var icons = {
        'PLAYING': 'fa-play',
        'PAUSED': 'fa-pause',
        'READY': 'fa-stop',
        'NULL': 'fa-exclamation-triangle'
    }
    var iconName = icons[state]
    return '<a href=\"#\" class="fas ' + iconName + (selected ? '' : ' icon-unselected') + '" data-state="' + state + '" ></a>'
}

components.openCards = {}
components.card = (props) => {
    var card = $('<div class="block-card"></div>')
    var header = $('<div class="block-card-head"></div>')
    if (props.title) header.append(props.title)
    if (props.options) {
        var options = $('<div class="option-icons"></div>')
        options.append(props.options)
        header.append(options)
    }
    card.append(header)
    if (props.state) card.append(props.state)
    if (props.mixOptions) card.append(props.mixOptions)

    const cardBody = $('<div class="block-card-body"></div>')
    cardBody.append(props.body)
    if (!components.openCards[props.title]) cardBody.css('display', 'none')

    const setToggleMsg = (target) => { target.html(components.openCards[props.title] ? components.hideDetails() : components.showDetails()) }
    const toggleSwitch = $('<a href="#">Toggle</a>').click((change) => {
        cardBody.toggle(components.openCards[props.title] = !components.openCards[props.title])
        setToggleMsg($(change.target))
        return false
    })
    setToggleMsg(toggleSwitch)
    card.append($('<div />').addClass('block-card-toggle').append(toggleSwitch))
    card.append(cardBody)
    return $('<div class="block-card-outer col-xl-3 col-lg-4 col-md-6 col-12"></div>').append(card)
}

components.stateBox = (item, onClick) => {
    const stateBoxDetails = getStateBox(item.state)
    stateBoxDetails.value.click(function(change) {
        var state = change.target.dataset.state
        onClick(item.id, state)
        return false
    })
    let msg = stateBoxDetails.value
    if (item.position) msg.append(' ', prettyDuration(item.position))
    return $('<div></div>')
        .append(msg)
        .addClass(stateBoxDetails.className)
}

components.volumeInput = (volume) => {
    const DEFAULT_VOLUME = 0.8
    if (volume === undefined || volume === null) volume = DEFAULT_VOLUME
    volume *= 100 // as it's a percentage
    return formGroup({
        id: 'input-volume',
        label: 'Volume',
        name: 'volume',
        type: 'text',
        'data-slider-min': 0,
        'data-slider-max': 100,
        'data-slider-step': 10,
        'data-slider-value': volume
    })
}

components.hideDetails = () => '<i class="fas fa-caret-down"></i> Hide details'
components.showDetails = () => '<i class="fas fa-caret-right"></i> Show details'
