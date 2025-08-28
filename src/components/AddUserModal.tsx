import React, { useState, useRef, useEffect } from "react";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (user: {
    username: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
    userRole: string;
  }) => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose, onAdd }) => {
  // Form states
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("admin");

  // Modal drag and position state
  const modalRef = useRef<HTMLDivElement | null>(null);
  const offset = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);

  // Resize drag state
  const isResizing = useRef(false);
  const resizeStart = useRef({ x: 0, y: 0 });
  const sizeStart = useRef({ width: 0, height: 0 });

  // Position and size state
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [size, setSize] = useState({ width: 600, height: 500 }); // default size

  // Set default position and size when modal opens
  useEffect(() => {
    if (isOpen) {
      setPosition({ top: window.innerHeight * 0.2, left: window.innerWidth * 0.3 });
      setSize({ width: 600, height: 500 });
    }
  }, [isOpen]);

  // Handle dragging modal
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging.current && modalRef.current) {
        const newLeft = e.clientX - offset.current.x;
        const newTop = e.clientY - offset.current.y;
        setPosition({ top: newTop, left: newLeft });
      } else if (isResizing.current) {
        // Calculate new width and height
        const newWidth = sizeStart.current.width + (e.clientX - resizeStart.current.x);
        const newHeight = sizeStart.current.height + (e.clientY - resizeStart.current.y);

        // Optionally set min/max size limits
        const minWidth = 300;
        const minHeight = 300;
        setSize({
          width: newWidth > minWidth ? newWidth : minWidth,
          height: newHeight > minHeight ? newHeight : minHeight,
        });
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      isResizing.current = false;
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const startDrag = (e: React.MouseEvent) => {
    if (!modalRef.current) return;
    isDragging.current = true;
    const rect = modalRef.current.getBoundingClientRect();
    offset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startResize = (e: React.MouseEvent) => {
    if (!modalRef.current) return;
    e.stopPropagation(); // prevent drag start
    isResizing.current = true;
    resizeStart.current = { x: e.clientX, y: e.clientY };
    sizeStart.current = { width: size.width, height: size.height };
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAdd({ username, firstName, lastName, phone, email, password, userRole });

    // Reset form fields after submit
    setUsername("");
    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setPassword("");
    setUserRole("admin");

    // Close modal
    onClose();

    // Reset position and size
    setPosition({ top: window.innerHeight * 0.2, left: window.innerWidth * 0.3 });
    setSize({ width: 600, height: 500 });
  };

  const handleCancelOrClose = () => {
    onClose();

    // Reset form fields here for cancel or close
    setUsername("");
    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setPassword("");
    setUserRole("admin");

    // Reset position and size
    setPosition({ top: window.innerHeight * 0.2, left: window.innerWidth * 0.3 });
    setSize({ width: 600, height: 500 });
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
      // Reset position and size but DO NOT reset form fields
      setPosition({ top: window.innerHeight * 0.2, left: window.innerWidth * 0.3 });
      setSize({ width: 600, height: 500 });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div
        className="modal"
        ref={modalRef}
        style={{
          position: "absolute",
          top: position.top,
          left: position.left,
          width: size.width,
          height: size.height,
          boxSizing: "border-box",
          overflow: "auto",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          className="modal-header"
          onMouseDown={startDrag}
          style={{
            // cursor: "move",
            padding: "10px 15px",
            borderBottom: "1px solid #ddd",
            userSelect: "none",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <span className="modal-title">Add New User</span>
          
          <button
            className="close-button"
            onClick={handleCancelOrClose}
          >
            ×
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="modal-form"
          style={{
            padding: "15px",
            flexGrow: 1,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {/* Form inputs here - unchanged */}
          <div className="form-row" style={{ display: "flex", gap: "10px" }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="userRole">User Role</label>
              <select
                id="userRole"
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
                required
              >
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="support">Support</option>
                <option value="apiConsumer">API Consumer</option>
              </select>
            </div>
          </div>

          <div className="form-row" style={{ display: "flex", gap: "10px" }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-row" style={{ display: "flex", gap: "10px" }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div
            className="modal-actions"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
              marginTop: "auto",
            }}
          >
            <button type="button" onClick={handleCancelOrClose}>
              Cancel
            </button>
            <button type="submit">Add</button>
          </div>
        </form>

        {/* Resize handle */}
        <div
          className="resize-handle"
          onMouseDown={startResize}
          style={{
            position: "absolute",
            width: "15px",
            height: "15px",
            right: 0,
            bottom: 0,
            cursor: "nwse-resize",
            backgroundColor: "transparent",
            zIndex: 10,
          }}
        />
      </div>
    </div>
  );
};

export default AddUserModal;
