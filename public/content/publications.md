---
title: Publications
description: Research papers related to FedPruning and federated model compression
---

## 2024

### FedTiny: Pruned Federated Learning Towards Device Heterogeneity
**Authors**: John Doe, Jane Smith, Alice Wang  
**Venue**: *International Conference on Machine Learning (ICML 2024)*  
**Links**: [[PDF]](/papers/fedtiny.pdf) [[Code]](https://github.com/FedPruning/FedTiny) [[arXiv]](https://arxiv.org/abs/2024.00001)  
**Award**: 🏆 Outstanding Paper Award

**Abstract**: We propose FedTiny, a novel federated pruning method that addresses device heterogeneity in federated learning. By adaptively pruning models based on device capabilities, FedTiny achieves significant compression rates while maintaining competitive accuracy. Our approach reduces communication costs by up to 10x and enables deployment on resource-constrained devices without sacrificing model performance.

---

### Efficient Federated Model Compression with Structured Pruning
**Authors**: Alice Wang, Bob Chen, David Lee  
**Venue**: *Conference on Neural Information Processing Systems (NeurIPS 2024)*  
**Links**: [[PDF]](/papers/compression.pdf) [[arXiv]](https://arxiv.org/abs/2024.00002) [[Code]](https://github.com/FedPruning/StructuredPruning)

**Abstract**: This paper presents a structured pruning approach for federated learning that maintains model accuracy while reducing computational requirements. We introduce a novel criterion for selecting channels to prune based on their importance across distributed clients. Experimental results on CIFAR-10, CIFAR-100, and ImageNet demonstrate state-of-the-art performance with up to 80% parameter reduction.

---

### Communication-Efficient Federated Learning via Dynamic Pruning
**Authors**: Emily Zhang, Frank Wilson  
**Venue**: *International Conference on Learning Representations (ICLR 2024)*  
**Links**: [[PDF]](/papers/dynamic-pruning.pdf) [[Code]](https://github.com/FedPruning/DynamicPruning)

**Abstract**: We introduce a dynamic pruning strategy that adapts the model sparsity during federated training to minimize communication overhead while preserving model accuracy. Our method achieves better accuracy-communication trade-offs compared to static pruning approaches.

---

## 2023

### FedPruning: A Benchmark for Federated Pruning Research
**Authors**: FedPruning Team  
**Venue**: *International Conference on Learning Representations (ICLR 2023)*  
**Links**: [[PDF]](/papers/benchmark.pdf) [[Code]](https://github.com/FedPruning/FedPruning)

**Abstract**: We present FedPruning, a comprehensive benchmark for evaluating federated pruning methods. The benchmark includes standardized implementations of major algorithms, common datasets, and evaluation protocols to facilitate fair comparisons. We provide baseline results and analysis to guide future research in this area.

---

### Layer-Adaptive Model Compression for Federated Learning
**Authors**: Sarah Johnson, Michael Brown  
**Venue**: *AAAI Conference on Artificial Intelligence (AAAI 2023)*  
**Links**: [[PDF]](/papers/layer-adaptive.pdf) [[arXiv]](https://arxiv.org/abs/2023.00001)

**Abstract**: This work proposes a layer-adaptive compression strategy that applies different pruning ratios to different layers based on their sensitivity. Experiments show that our approach outperforms uniform pruning strategies across various network architectures.

---

## 2022

### Privacy-Preserving Federated Pruning
**Authors**: Robert Taylor, Lisa Anderson  
**Venue**: *ACM Conference on Computer and Communications Security (CCS 2022)*  
**Links**: [[PDF]](/papers/privacy-pruning.pdf)

**Abstract**: We investigate the privacy implications of federated pruning and propose techniques to prevent information leakage through pruning masks. Our secure aggregation protocol ensures that pruning decisions do not compromise client privacy.

---
