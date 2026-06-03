# AI-Semiconductor-Circuit-Builder

## 🚀 Overview

AI-Semiconductor-Circuit-Builder (NeuralForge) is an interactive web-based semiconductor chip design assistant that helps users visualize and analyze AI accelerator architectures. It provides real-time Power, Performance, and Area (PPA) calculations with a stunning visually appealing dark/light theme design.

---

## ✨Features

- ✅ **Design Parameter Configuration** – Configure project name, design goals, process nodes (3nm to 10nm), and target architectures (CPU, NPU, GPU, ASIC)
- ✅ **Advanced PPA Calculation Engine** – Real-time computation of Power (Dynamic + Static), Die Area, and TOPS (Tera Operations Per Second) metrics
- ✅ **Dynamic Circuit Visualization** – Procedural generation of silicon floorplan layouts with core matrix visualization on canvas
- ✅ **Project Storage & Management** – Save, load, and delete chip design projects with persistent localStorage integration
- ✅ **Design Comparison Workspace** – Compare multiple design variants side-by-side in a comprehensive comparison table
- ✅ **Dark/Light Theme Toggle** – Seamless theme switching with persistent user preference storage

---

## 🛠️ Technologies Used

- HTML5  
- CSS3  
- Javascript

---

## 📂 Project Structure

```text
AI-Semiconductor-Circuit-Builder/
│
├── index.html        # Main HTML file with semantic structure
├── style.css         # CSS styling with dark/light theme support
├── script.js         # JavaScript functionality (theme, PPA calculations, project management)
├── README.md         # Project documentation

```

---


## 🌐 Demo & Repository

🔗 Live Demo: [https://100-days-100-web-project.vercel.app/public/AI-Semiconductor-Circuit-Builder/index.html](https://100-days-100-web-project.vercel.app/public/AI-Semiconductor-Circuit-Builder/index.html)

🔗 GitHub Repository: [https://github.com/dhairyagothi/100_days_100_web_project/tree/Main/public/AI-Semiconductor-Circuit-Builder](https://github.com/dhairyagothi/100_days_100_web_project/tree/Main/public/AI-Semiconductor-Circuit-Builder)


### Clone Repository

```bash
git clone https://github.com/dhairyagothi/100_days_100_web_project/tree/Main/public/AI-Semiconductor-Circuit-Builder.git
```

---

## 🎮 How to Use

### **Step 1: Configure Design Parameters**
1. Enter a project name (e.g., "Alpha_Core_V1")
2. Select a design goal (HPC, ULP, AI/ML, Mobile, etc.)
3. Choose a process node (3nm, 5nm, 7nm, or 10nm)
4. Pick a target architecture (CPU, NPU, GPU, or ASIC)
5. Adjust core count (1-128 cores) using the slider
6. Set target frequency (0.5-5.0 GHz) using the frequency slider

### **Step 2: Synthesize Design**
- Click "Synthesize & Compute PPA" button
- The system calculates and displays:
  - **Power Consumption**: Dynamic + Static power dissipation
  - **Die Area**: Silicon area required in mm²
  - **Performance**: TOPS (Tera Operations Per Second)
  - **Efficiency**: TOPS per Watt ratio
  - **Visual Floorplan**: Canvas-based circuit diagram

### **Step 3: Compare Designs**
1. Create multiple designs with different configurations
2. Click "Commit to Local Project Vault" to save designs
3. All saved designs appear in the **Design Comparison Workspace**
4. Compare specifications side-by-side in the table
5. Click "Clear Matrix" to reset comparisons

### **Step 4: Export & Save**
- **Export Design JSON**: Download design specifications as JSON file
- **Commit to Project Vault**: Save to browser localStorage
- **Saved Projects**: Appear in the left sidebar for quick access

### **Step 5: Toggle Theme**
- Click the moon/sun icon in the top-right header
- Switch between dark (default) and light themes
- Your preference is automatically saved

---

## 📊 PPA Calculation Details

The tool uses advanced semiconductor physics formulas:

- **Dynamic Power**: P = α × C × V² × f (activity factor, capacitance, voltage squared, frequency)
- **Static Power**: Leakage current based on process node and design goal
- **Die Area**: Core area + Uncore infrastructure (NOC, Memory Controllers, Crossbar)
- **Performance**: TOPS per core × frequency × core count
- **Efficiency**: Performance / Power consumption ratio

### Supported Architectures:
- **CPU**: General-purpose processors (0.5 TOPS/GHz/Core)
- **NPU**: Neural Processing Units - AI optimized (2.5 TOPS/GHz/Core)
- **GPU**: Graphics processors (1.2 TOPS/GHz/Core)
- **ASIC**: Application-specific circuits (0.5 TOPS/GHz/Core)

---

## 📱 Responsive Design

This project works smoothly across multiple devices:

- 💻 Desktop
- 🖥️ Laptop
- 📱 Mobile
- 📲 Tablet

---

## ▶️ How to Run

### 1. Clone the Repository

```bash
git clone https://github.com/dhairyagothi/100_days_100_web_project/tree/Main/public/AI-Semiconductor-Circuit-Builder.git
```


### 2. Navigate to Project Folder

```bash
cd AI-Semiconductor-Circuit-Builder
```

### 3. Open in Browser

Open the `index.html` file in your browser.

Enjoy using NeuralForge - AI Semiconductor Circuit Builder! 🚀

---

## 📸 Screenshot
<img width="1879" height="1614" alt="image" src="https://github.com/user-attachments/assets/c2e70484-cc12-430a-9e44-2286aacad358" />

---

## 📄 License

This project is created for **educational, learning, and portfolio purposes**.

You are free to modify and use this project for personal development and practice.

