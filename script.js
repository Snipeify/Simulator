// Add interactive functionality
document.addEventListener("DOMContentLoaded", () => {
  // App State Management
  let currentScreen = "home-screen"
  let balance = 525.9
  let selectedContact = null
  let selectedContactImage = null
  let tempProfileImage = null

  // Initialize app
  console.log("Cash App Simulator loaded successfully!")
  updateBalance()

  // Add fake money every 30 seconds for demo
  setInterval(() => {
    const randomAmount = Math.random() * 50 + 10 // $10-60
    balance += randomAmount
    updateBalance()
    showNotification(`+$${randomAmount.toFixed(2)} received from Cash Boost!`)
  }, 30000)

  // Add balance update animation
  const balanceAmount = document.querySelector(".balance-amount")

  // Simulate balance changes
  setInterval(() => {
    const change = (Math.random() - 0.5) * 10
    balance += change

    // Animate number change
    balanceAmount.style.transform = "scale(1.05)"
    setTimeout(() => {
      balanceAmount.textContent = `$${balance.toFixed(2)}`
      balanceAmount.style.transform = "scale(1)"
    }, 150)
  }, 10000)

  // Add hover effects for service cards
  const serviceCards = document.querySelectorAll(".service-card")
  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-4px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })

  // Simulate loading states
  const actionButtons = document.querySelectorAll(".action-btn")
  actionButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const originalText = this.textContent
      this.textContent = "Loading..."
      this.style.opacity = "0.7"

      setTimeout(() => {
        this.textContent = originalText
        this.style.opacity = "1"
      }, 2000)
    })
  })

  // Screen Navigation
  function showScreen(screenId) {
    const currentScreenEl = document.querySelector(".screen.active")
    const newScreenEl = document.getElementById(screenId)

    if (currentScreenEl) {
      currentScreenEl.classList.remove("active")
      currentScreenEl.classList.add("slide-out")

      setTimeout(() => {
        currentScreenEl.classList.remove("slide-out")
      }, 300)
    }

    setTimeout(() => {
      newScreenEl.classList.add("active")
      currentScreen = screenId
    }, 150)
  }

  function goBack() {
    showScreen("home-screen")
    updateNavigation("home")
  }

  function goHome() {
    showScreen("home-screen")
    updateNavigation("home")
  }

  // Navigation Functions
  function showHome() {
    showScreen("home-screen")
    updateNavigation("home")
  }

  function showSend() {
    showScreen("send-screen")
    updateNavigation("send")
  }

  function showActivity() {
    showNotification("Activity screen coming soon!")
  }

  function showSearch() {
    showNotification("Search feature coming soon!")
  }

  function showProfile() {
    showNotification("Profile settings coming soon!")
  }

  function showProfileCustomizer() {
    openProfileModal()
  }

  // Service Functions
  function showAddCash() {
    openAddCashModal()
  }

  function showCashOut() {
    showNotification("Cash Out feature coming soon!")
  }

  function showSavings() {
    showNotification("Savings feature coming soon!")
  }

  function showBorrow() {
    showNotification("Borrow feature coming soon!")
  }

  function showTaxes() {
    showNotification("Tax filing feature coming soon!")
  }

  function showPaychecks() {
    showNotification("Paychecks feature coming soon!")
  }

  function showBitcoin() {
    showNotification("Bitcoin trading coming soon!")
  }

  function showStocks() {
    showNotification("Stock trading coming soon!")
  }

  function showAccountDetails() {
    showNotification("Account: ****1234 | Routing: 123456789")
  }

  // Profile Functions
  function changeProfile(imageUrl) {
    document.getElementById("profile-image").src = imageUrl
    document.getElementById("preview-image").src = imageUrl
    showNotification("Profile picture updated!")

    // Add selection effect
    document.querySelectorAll(".profile-option").forEach((option) => {
      option.classList.remove("selected")
    })
    event.target.closest(".profile-option").classList.add("selected")
  }

  // Contact Functions
  function selectContact(name, imageUrl) {
    selectedContact = name
    selectedContactImage = imageUrl

    const contactItems = document.querySelectorAll(".contact-item")
    contactItems.forEach((item) => {
      item.classList.remove("selected")
      if (item.textContent.trim() === name) {
        item.classList.add("selected")
      }
    })

    showNotification(`Selected ${name}`)
  }

  // Payment Method Functions
  function selectPaymentMethod(element) {
    document.querySelectorAll(".payment-method").forEach((method) => {
      method.classList.remove("selected")
    })
    element.classList.add("selected")
  }

  // Transaction Functions
  function processSend() {
    const amount = Number.parseFloat(document.getElementById("send-amount").value)
    const note = document.getElementById("send-note").value || "No note"

    if (!amount || amount <= 0) {
      showNotification("Please enter a valid amount")
      return
    }

    if (!selectedContact) {
      showNotification("Please select a contact")
      return
    }

    if (amount > balance) {
      showNotification("Insufficient funds")
      return
    }

    // Show loading
    const sendBtn = document.querySelector(".send-btn")
    sendBtn.classList.add("loading")
    sendBtn.textContent = "Sending..."
    sendBtn.disabled = true

    setTimeout(() => {
      // Update balance
      balance -= amount
      updateBalance()

      // Show success screen with transaction details
      document.getElementById("success-title").textContent = "Money Sent!"
      document.getElementById("success-message").textContent = `$${amount.toFixed(2)} sent to ${selectedContact}`

      const transactionDetails = document.getElementById("transaction-details")
      transactionDetails.innerHTML = `
        <h4>Transaction Details</h4>
        <p><strong>To:</strong> ${selectedContact}</p>
        <p><strong>Amount:</strong> $${amount.toFixed(2)}</p>
        <p><strong>Note:</strong> ${note}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleTimeString()}</p>
      `

      showScreen("success-screen")

      // Reset form
      document.getElementById("send-amount").value = ""
      document.getElementById("send-note").value = ""
      selectedContact = null
      selectedContactImage = null

      // Reset button
      sendBtn.classList.remove("loading")
      sendBtn.textContent = "Send"
      sendBtn.disabled = false

      // Clear contact selection
      document.querySelectorAll(".contact-item").forEach((item) => {
        item.classList.remove("selected")
      })
    }, 2000)
  }

  function processAddCash() {
    const amount = Number.parseFloat(document.getElementById("add-amount").value)

    if (!amount || amount <= 0) {
      showNotification("Please enter a valid amount")
      return
    }

    // Show loading
    const addBtn = document.querySelector(".add-cash-btn")
    addBtn.classList.add("loading")
    addBtn.textContent = "Adding Cash..."
    addBtn.disabled = true

    setTimeout(() => {
      // Update balance
      balance += amount
      updateBalance()

      // Show success screen
      document.getElementById("success-title").textContent = "Cash Added!"
      document.getElementById("success-message").textContent = `$${amount.toFixed(2)} added to your Cash App`

      const transactionDetails = document.getElementById("transaction-details")
      transactionDetails.innerHTML = `
        <h4>Transaction Details</h4>
        <p><strong>Amount:</strong> $${amount.toFixed(2)}</p>
        <p><strong>From:</strong> Bank Card ••••4532</p>
        <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleTimeString()}</p>
        <p><strong>Status:</strong> Completed</p>
      `

      showScreen("success-screen")

      // Reset form
      document.getElementById("add-amount").value = ""

      // Reset button
      addBtn.classList.remove("loading")
      addBtn.textContent = "Add Cash"
      addBtn.disabled = false
    }, 2000)
  }

  // Utility Functions
  function updateBalance() {
    const balanceDisplay = document.getElementById("balance-display")
    const navBalance = document.getElementById("nav-balance")

    balanceDisplay.textContent = `$${balance.toFixed(2)}`
    navBalance.textContent = `$${Math.floor(balance)}`

    // Animate balance change
    balanceDisplay.style.transform = "scale(1.05)"
    balanceDisplay.style.color = "#00d4aa"

    setTimeout(() => {
      balanceDisplay.style.transform = "scale(1)"
      balanceDisplay.style.color = "#000"
    }, 300)
  }

  function updateNavigation(activeTab) {
    const navItems = document.querySelectorAll(".nav-item")
    navItems.forEach((item) => item.classList.remove("active"))

    switch (activeTab) {
      case "home":
        navItems[0].classList.add("active")
        break
      case "activity":
        navItems[1].classList.add("active")
        break
      case "send":
        navItems[2].classList.add("active")
        break
      case "search":
        navItems[3].classList.add("active")
        break
      case "profile":
        navItems[4].classList.add("active")
        break
    }
  }

  function showNotification(message) {
    // Create notification element
    const notification = document.createElement("div")
    notification.className = "notification"
    notification.textContent = message
    notification.style.cssText = `
      position: fixed;
      top: 80px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0, 0, 0, 0.9);
      color: white;
      padding: 12px 20px;
      border-radius: 20px;
      font-size: 14px;
      z-index: 10000;
      animation: slideDown 0.3s ease;
      max-width: 300px;
      text-align: center;
    `

    document.body.appendChild(notification)

    setTimeout(() => {
      notification.style.animation = "slideUp 0.3s ease forwards"
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification)
        }
      }, 300)
    }, 3000)
  }

  // Add notification animations
  const notificationStyles = document.createElement("style")
  notificationStyles.textContent = `
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateX(-50%) translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
    }
    
    @keyframes slideUp {
      from {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
      to {
        opacity: 0;
        transform: translateX(-50%) translateY(-20px);
      }
    }
  `
  document.head.appendChild(notificationStyles)

  // Auto-focus amount inputs
  const amountInputs = document.querySelectorAll(".amount-input")
  amountInputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.parentElement.style.transform = "scale(1.02)"
    })

    input.addEventListener("blur", function () {
      this.parentElement.style.transform = "scale(1)"
    })
  })

  // Simulate real-time balance updates
  setInterval(() => {
    // Small random fluctuations to make it feel more real
    const change = (Math.random() - 0.5) * 0.1
    balance += change

    // Update display occasionally
    if (Math.random() < 0.1) {
      updateBalance()
    }
  }, 5000)

  // Add new modal functions
  function openAddCashModal() {
    const modal = document.getElementById("add-cash-modal")
    modal.classList.add("show")
    document.getElementById("modal-add-amount").focus()
  }

  function closeAddCashModal() {
    const modal = document.getElementById("add-cash-modal")
    modal.classList.remove("show")
    document.getElementById("modal-add-amount").value = ""
  }

  function openProfileModal() {
    const modal = document.getElementById("profile-modal")
    const currentImage = document.getElementById("profile-image").src
    document.getElementById("modal-preview-image").src = currentImage
    tempProfileImage = currentImage
    modal.classList.add("show")
  }

  function closeProfileModal() {
    const modal = document.getElementById("profile-modal")
    modal.classList.remove("show")
    tempProfileImage = null
    // Clear any selections
    document.querySelectorAll(".modal-body .profile-option").forEach((option) => {
      option.classList.remove("selected")
    })
  }

  function selectModalPaymentMethod(element) {
    document.querySelectorAll("#add-cash-modal .payment-method").forEach((method) => {
      method.classList.remove("selected")
    })
    element.classList.add("selected")
  }

  function processModalAddCash() {
    const amount = Number.parseFloat(document.getElementById("modal-add-amount").value)

    if (!amount || amount <= 0) {
      showNotification("Please enter a valid amount")
      return
    }

    if (amount > 10000) {
      showNotification("Maximum amount is $10,000")
      return
    }

    // Show loading
    const addBtn = document.querySelector(".modal-add-btn")
    const originalText = addBtn.textContent
    addBtn.classList.add("loading")
    addBtn.textContent = "Adding Cash..."
    addBtn.disabled = true

    setTimeout(() => {
      // Update balance
      balance += amount
      updateBalance()

      // Close modal
      closeAddCashModal()

      // Show success notification
      showNotification(`+$${amount.toFixed(2)} added to your Cash App!`)

      // Show success screen
      document.getElementById("success-title").textContent = "Cash Added!"
      document.getElementById("success-message").textContent = `$${amount.toFixed(2)} added to your Cash App`

      const transactionDetails = document.getElementById("transaction-details")
      transactionDetails.innerHTML = `
        <h4>Transaction Details</h4>
        <p><strong>Amount:</strong> $${amount.toFixed(2)}</p>
        <p><strong>From:</strong> Bank Card ••••4532</p>
        <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleTimeString()}</p>
        <p><strong>Status:</strong> Completed</p>
      `

      showScreen("success-screen")

      // Reset button
      addBtn.classList.remove("loading")
      addBtn.textContent = originalText
      addBtn.disabled = false
    }, 2000)
  }

  function handleProfileUpload(event) {
    const file = event.target.files[0]
    if (!file) return

    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      showNotification("Please select an image file")
      return
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showNotification("Image size must be less than 5MB")
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const imageUrl = e.target.result
      tempProfileImage = imageUrl
      document.getElementById("modal-preview-image").src = imageUrl

      // Clear preset selections
      document.querySelectorAll(".modal-body .profile-option").forEach((option) => {
        option.classList.remove("selected")
      })

      showNotification('Image uploaded! Click "Save Changes" to apply.')
    }
    reader.readAsDataURL(file)
  }

  function changeModalProfile(imageUrl) {
    tempProfileImage = imageUrl
    document.getElementById("modal-preview-image").src = imageUrl

    // Update selection
    document.querySelectorAll(".modal-body .profile-option").forEach((option) => {
      option.classList.remove("selected")
    })
    event.target.closest(".profile-option").classList.add("selected")
  }

  function saveProfileChanges() {
    if (tempProfileImage) {
      document.getElementById("profile-image").src = tempProfileImage
      showNotification("Profile picture updated!")
      closeProfileModal()
    } else {
      showNotification("Please select or upload an image first")
    }
  }

  // Add click outside modal to close
  document.addEventListener("click", (event) => {
    const addCashModal = document.getElementById("add-cash-modal")
    const profileModal = document.getElementById("profile-modal")

    if (event.target === addCashModal) {
      closeAddCashModal()
    }

    if (event.target === profileModal) {
      closeProfileModal()
    }
  })

  // Add escape key to close modals
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAddCashModal()
      closeProfileModal()
    }
  })
})

// Add CSS for ripple animation
const rippleStyle = document.createElement("style")
rippleStyle.textContent = `
  @keyframes ripple {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
`
document.head.appendChild(rippleStyle)
