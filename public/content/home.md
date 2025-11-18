---
title: FedPruning
subtitle: A Comprehensive Library and Benchmark for Efficient Federated Pruning
description: State-of-the-art federated pruning methods for distributed learning with model compression
cta:
  - text: Get Started
    link: https://honghuangs-organization.gitbook.io/fedpruning-documents
  - text: View on GitHub
    link: https://github.com/FedPruning/FedPruning
---

## About FedPruning

FedPruning is a comprehensive library designed for efficient federated pruning in distributed learning environments. It provides implementations of state-of-the-art federated pruning algorithms, standardized evaluation protocols, and extensible architectures for researchers and practitioners working on model compression in federated learning settings.

Our library addresses the critical challenge of deploying large-scale machine learning models on resource-constrained devices while maintaining privacy and model performance. By combining federated learning with neural network pruning, FedPruning enables efficient training and deployment of compressed models across heterogeneous devices.

## Key Features

### Comprehensive Methods
Includes classical and cutting-edge federated pruning algorithms including FedTiny, DepthFL, PruneFL, and more. Each method is carefully implemented and validated against published results.

### Easy to Use
Simple APIs and clear documentation for quick integration. Get started with just a few lines of code and seamlessly integrate with your existing federated learning pipeline.

### Benchmark Suite
Standardized evaluation protocols for fair comparison across different methods. Includes common datasets, metrics, and experimental settings for reproducible research.

### Extensible Design
Modular architecture for implementing custom pruning strategies. Easily extend base classes to implement your own algorithms and compare with existing methods.


## Testing Markdown Syntax

### Text Formatting

This section demonstrates **bold text**, *italic text*, and ***bold italic text***. You can also use `inline code` for technical terms like `FedPruning.train()` or file names.

### Lists

**Unordered List:**
- First item with regular text
- Second item with **bold** and *italic*
- Third item with a [link to documentation](https://example.com)
  - Nested item 1
  - Nested item 2

**Ordered List:**
1. Initialize the federated pruning environment
2. Configure pruning parameters
3. Execute the training pipeline
4. Evaluate compressed model performance

### Code Blocks

**Python Example:**
```python
from fedpruning import FedTinyPruner

# Initialize pruner
pruner = FedTinyPruner(
    model=model,
    sparsity=0.5,
    num_clients=10
)

# Start federated pruning
pruner.train(num_rounds=100)
```

**JSON Configuration:**
```json
{
  "algorithm": "FedTiny",
  "sparsity": 0.5,
  "clients": 10,
  "rounds": 100
}
```

### Tables

| Algorithm | Sparsity | Accuracy | Communication Cost |
|-----------|----------|----------|--------------------|
| FedTiny   | 50%      | 94.2%    | Low                |
| DepthFL   | 60%      | 93.8%    | Medium             |
| PruneFL   | 70%      | 92.5%    | High               |

### Blockquotes

> FedPruning enables efficient model compression in federated learning settings, reducing communication overhead while maintaining model performance.
> 
> — Research Paper, 2024

### Links and Images

Check out our [GitHub repository](https://github.com/example/fedpruning) for more examples.

**Image syntax (example):**
[FedPruning Architecture](https://example.com/architecture.png)

### Horizontal Rule

---

### Task Lists

- [x] Implement FedTiny algorithm
- [x] Add benchmark suite
- [ ] Support PyTorch 2.0
- [ ] Add visualization tools

### Footnotes

FedPruning supports multiple frameworks[^1] and has been tested on various datasets[^2].

[^1]: Currently supports PyTorch and TensorFlow
[^2]: Including CIFAR-10, CIFAR-100, and ImageNet

### Strikethrough and Highlights

~~Deprecated: Old API~~ Use the new `FedPruner` class instead.

### Emoji Support

🚀 Fast pruning algorithms  
📊 Comprehensive benchmarks  
🔧 Easy to customize  
💡 State-of-the-art performance